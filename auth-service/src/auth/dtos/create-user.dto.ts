import { IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public username: string;

  @IsStrongPassword()
  @IsString()
  password: string;
}
