import { IsEmail, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class AuthUserLoginRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
