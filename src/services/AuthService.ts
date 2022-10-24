import { Injectable } from '@nestjs/common';
import { UserService } from '@Services/UserService';
import { BadRequestException } from '@Exceptions/BadRequestException';
import { SessionRepository } from '@src/repositories/SessionRepository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@Models/entities/User';
import { Session } from '@Models/entities/Session';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly sessionRepository: SessionRepository,
  ) {}
  async refresh(refreshStr: string): Promise<string | undefined> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);
    if (!refreshToken) {
      return undefined;
    }
    const user = await this.userService.getUserById(refreshToken.user.id);
    if (!user) {
      return undefined;
    }
    const accessToken = {
      user: refreshToken.user,
    };
    return this.jwtService.sign(accessToken, {
      expiresIn: process.env.ACCESS_TOKEN_TIME_TO_LEAVE,
      algorithm: 'HS256',
    });
  }
  async login(
    email: string,
    password: string,
    values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid  login or password');
    }
    // verify your user password
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid  login or password');
    }
    // Create tokens
    const tokens = await this.signRefreshAndAccessToken(user);
    // check if session exists
    const isConnected = await this.sessionRepository.existsSessionByToken(tokens.refreshToken);
    // save the session in the database if it does not exist or update it if it exists
    if (!isConnected) {
      // instanciate a new session
      const session: Session = new Session(
        values.userAgent,
        values.ipAddress,
        user,
        tokens.refreshToken,
      );
      await this.sessionRepository.createSession(session);
    } else {
      // Fix this logic by getting refresh token from request and check on it
      const registeredSession: Session = await this.sessionRepository.getSessionByToken(
        tokens.refreshToken,
      );
      registeredSession.token = tokens.refreshToken;
      await this.sessionRepository.updateSession(registeredSession.id, registeredSession);
    }
    // return tokens
    return tokens;
  }
  async logout(refreshStr: string): Promise<void> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);
    if (!refreshToken) {
      return;
    }
    // delete refreshtoken from db
  }
  async signRefreshAndAccessToken(
    user: User,
  ): Promise<{ accessToken: string; user: User; refreshToken: string }> {
    const accessToken = this.jwtService.sign(
      { ...user },
      {
        expiresIn: process.env.REFRESH_TOKEN_TIME_TO_LEAVE,
        algorithm: 'HS256',
      },
    );
    const refreshToken = this.jwtService.sign(
      { ...user },
      {
        expiresIn: process.env.ACCESS_TOKEN_TIME_TO_LEAVE,
        algorithm: 'HS256',
      },
    );
    return {
      user,
      accessToken,
      refreshToken,
    };
  }
  async retrieveRefreshToken(refreshStr: string): Promise<Session | undefined> {
    try {
      const decoded = this.jwtService.verify(refreshStr);
      if (typeof decoded === 'string') {
        return undefined;
      }
      return await this.sessionRepository.getSessionByToken(refreshStr);
    } catch (e) {
      return undefined;
    }
  }
}
