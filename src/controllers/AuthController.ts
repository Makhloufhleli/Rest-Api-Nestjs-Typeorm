import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Ip,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { AuthService } from '@Services/AuthService';
import { LoginDto } from '@Models/dto/auth/LoginDto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from '@Models/dto/response/ResponseEntity';
import { Public } from '@src/Decorators/Public';
import { GetCurrentUserId } from '@src/Decorators/GetCurrentUserId';
import { AccessTokenGuard } from '@Security/guards/AccessTokenGuard';
import { RefreshTokenGuard } from '@Security/guards/RefreshTokenGuard';
import { GetCurrentUser } from '@src/Decorators/GetCurrentUser';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({
    summary: 'Login a user (save a new session and returns access and refresh tokens)',
  })
  async login(@Req() request, @Ip() ip: string, @Body() loginDto: LoginDto) {
    return ResponseEntity.OK(
      'Login successful',
      await this.authService.login(loginDto.email, loginDto.password, {
        ipAddress: ip,
        userAgent: request.headers['user-agent'],
      }),
    );
  }

  @UseGuards(AccessTokenGuard)
  @Delete('logout')
  @ApiOperation({ summary: 'Expire refresh token and logout user' })
  async logout(@Req() request: Request, @GetCurrentUserId() userId: number) {
    return ResponseEntity.OK(
      'Logout successful',
      await this.authService.logout(userId, request.headers['user-agent']),
    );
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Patch('refresh')
  async refreshTokens(
    @Req() request: Request,
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return ResponseEntity.OK(
      'successfully refreshed',
      await this.authService.refreshTokens(userId, request.headers['user-agent'], refreshToken),
    );
  }
}
