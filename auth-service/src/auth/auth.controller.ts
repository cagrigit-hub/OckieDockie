import { LoginUserDto } from './dtos/login-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  getHello(): {
    message: string;
    status: number;
  } {
    return {
      message: 'Welcome to the Auth Service',
      status: 200,
    };
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log(req.body);
    return this.authService.login(req.body);
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }

  @Get('env')
  async getEnv() {
    return process.env;
  }
}
