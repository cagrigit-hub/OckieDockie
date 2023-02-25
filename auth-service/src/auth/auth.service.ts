import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';
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

  async login(user: { username: string; userId: number }) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: { username: string; password: string }) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);

    const newUser = new User();
    newUser.username = user.username;
    newUser.password = hash;
    newUser.salt = salt;
    return await this.usersService.createUser(newUser);
  }
}
