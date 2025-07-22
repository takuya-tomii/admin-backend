import { Controller, Delete, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local')
  async local() {
    return this.authService.local();
  }

  @Post('sso')
  async sso() {
    return this.authService.sso();
  }

  @Delete()
  async logout() {
    return this.authService.logout();
  }

  @Post('refreshToken')
  async refreshToken() {
    return this.authService.refreshToken();
  }

  @Get('verify')
  async verify() {
    return 'verify';
  }
}
