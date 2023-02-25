import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string) {
    const user = await this.usersService.findUser(username);
    const salt = user.salt;
    const hash = await bcrypt.hash(password, salt);
    if (user && user.password === hash) {
      const { password, salt, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: { username: string }) {
    const userId = await this.usersService.findUser(user.username);
    const payload = { username: user.username, sub: userId.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: { username: string; password: string }) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);

    return await this.usersService.createUser({
      username: user.username,
      password: hash,
      salt,
    });
  }
}
