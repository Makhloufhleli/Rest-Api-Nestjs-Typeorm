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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from '@Models/dto/response/ResponseEntity';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token based on refresh token when token expires' })
  async refreshToken(@Body() body: RefreshTokenDto) {
    return ResponseEntity.OK(
      'Refresh successful',
      await this.authService.refresh(body.refreshToken),
    );
  }

  @Delete('logout')
  @ApiOperation({ summary: 'Expire refresh token and logout user' })
  async logout(@Body() body: RefreshTokenDto) {
    return ResponseEntity.OK('Logout successful', await this.authService.logout(body.refreshToken));
  }
}
