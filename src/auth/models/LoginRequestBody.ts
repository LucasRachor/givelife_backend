import { IsEmail, IsString } from 'class-validator';

export class LoginRequestBody {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}