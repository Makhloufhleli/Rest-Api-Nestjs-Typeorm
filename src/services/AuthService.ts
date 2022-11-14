import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@Services/UserService';
import { BadRequestException } from '@Exceptions/BadRequestException';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Session } from '@Models/entities/Session';
import { SessionRepository } from '@src/repositories/SessionRepository';
import { JwtPayload } from '@Models/shared/JwtPayload';
import { Tokens } from '@Models/shared/Tokens';
import { TokensDataResponse } from '@Models/shared/TokensDataResponse';
import { UserRepository } from '@src/repositories/UserRepository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private sessionRepository: SessionRepository,
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * Login user and save session
   * @param email
   * @param password
   * @param values
   */
  async login(
    email: string,
    password: string,
    values: { userAgent: string; ipAddress: string },
  ): Promise<TokensDataResponse | undefined> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid  login or password');
    }
    // verify user password
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid  login or password');
    }
    // Prepare tokens
    const tokens = await this.signTokens(user.id, user.email);

    // Hash refresh token to safely save it into the database
    const hashedRefresh = await bcrypt.hash(tokens.refreshToken, 10);

    // Check if is already connected with the same device
    const isAlreadyConnectedWithAgent = await this.sessionRepository.isAlreadyHaveSession(
      user.id,
      values.userAgent,
    );

    if (isAlreadyConnectedWithAgent) {
      // get saved session to update
      const savedSession = await this.sessionRepository.getSesstionByUserIdAndUserAgent(
        user.id,
        values.userAgent,
      );
      // if is already connected update the session with a new refresh token
      await this.sessionRepository.updateSession(savedSession.id, hashedRefresh);

      return {
        user,
        ...tokens,
      };
    } else {
      // Create a new session
      const userSession = new Session(values.userAgent, values.ipAddress, user, hashedRefresh);
      await this.sessionRepository.createSession(userSession);

      return {
        user,
        ...tokens,
      };
    }
  }

  /**
   * Expire session and logout user
   * @param userId
   * @param userAgent
   */
  async logout(userId: number, userAgent: string): Promise<boolean> {
    return (await this.sessionRepository.expireSessionByUserAgent(userId, userAgent)).affected > 0;
  }

  /**
   * Delete user session
   * @param sessionId
   */
  async deleteSession(sessionId: number): Promise<boolean> {
    return await this.sessionRepository.expireSessionById(sessionId);
  }
  async refreshTokens(
    userId: number,
    userAgent: string,
    refreshToken: string,
  ): Promise<TokensDataResponse | undefined> {
    // Check if the user exists by the given id
    const isRegistered = await this.userRepository.existsById(userId);
    if (!isRegistered) {
      throw new UnauthorizedException('Unauthorized');
    }
    // Check if the user have a valid session(session not expired and token not null)
    const isValidSession = await this.sessionRepository.isValidSession(userId, userAgent);
    if (!isValidSession) {
      throw new UnauthorizedException('Unauthorized');
    }
    // Get session to update token
    const session = await this.sessionRepository.getSesstionByUserIdAndUserAgent(userId, userAgent);
    // Check if the sent token is the same as the saved token with the session
    const tokensMatches = await bcrypt.compare(refreshToken, session.token);
    if (!tokensMatches) {
      throw new UnauthorizedException('Unauthorized');
    }

    // Generate new access and refresh tokens
    const tokens = await this.signTokens(userId, session.user.email);
    const newSession: Session = {
      ...session,
      token: tokens.refreshToken,
    };
    // Hash refresh token to safely save it into the database
    const hashedRefresh = await bcrypt.hash(tokens.refreshToken, 10);
    await this.sessionRepository.updateSession(newSession.id, hashedRefresh);
    return tokens;
  }
  /**
   * Sign access and refresh tokans
   * @param userId
   * @param email
   */
  async signTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
