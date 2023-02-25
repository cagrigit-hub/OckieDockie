import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    findUser(username: string): Promise<User | undefined>;
    createUser(user: User): Promise<User>;
}
