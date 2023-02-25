import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findUser(username: string): Promise<User | undefined> {
    const user = await this.repo.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }
  async createUser(user: {
    username: string;
    password: string;
    salt: string;
  }): Promise<Partial<User>> {
    const newUser = this.repo.create(user);
    const { password, salt, ...result } = newUser;
    try {
      await this.repo.save(newUser);
    } catch (error) {
      console.log(error);
    }
    return result;
  }
}
