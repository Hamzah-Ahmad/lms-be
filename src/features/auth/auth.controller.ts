import { Controller, Post, Body, Request, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

import { RegisterDto } from './dtos/register.dto';
import { Response } from 'express';
import { UserResponseDto } from './dtos/user-response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);
    return new UserResponseDto(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(req.user);
  
    res.cookie('access_token', token.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
  
    return { message: 'Logged in' }; // Don't return token in body
  }
}
