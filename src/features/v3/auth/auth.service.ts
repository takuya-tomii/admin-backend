import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async local() {
    return 'local';
  }

  async sso() {
    return 'sso';
  }

  async logout() {
    return 'logout';
  }

  async refreshToken() {
    return 'refreshToken';
  }
}
