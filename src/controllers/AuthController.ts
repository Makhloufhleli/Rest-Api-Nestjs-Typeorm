import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Ip,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '@Services/AuthService';
import { LoginDto } from '@Models/dto/auth/LoginDto';
import { RefreshTokenDto } from '@Models/dto/auth/RefreshTokenDto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Req() request, @Ip() ip: string, @Body() body: LoginDto) {
    return this.authService.login(body.email, body.password, {
      ipAddress: ip,
      userAgent: request.headers['user-agent'],
    });
  }

  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refreshToken);
  }

  @Delete('logout')
  async logout(@Body() body: RefreshTokenDto) {
    return this.authService.logout(body.refreshToken);
  }
}
