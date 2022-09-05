import { IsEmail, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class AuthUserRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  pecuniary: number;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
