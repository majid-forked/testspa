import {
  Controller,
  Post,
  Response,
  Body,
} from '@nestjs/common';
import { Response as Res } from 'express';
import { AuthService } from './auth.service';
import { AuthUserRequestDto } from './dtos/request/auth-user-request.dto';
import { AuthUserLoginRequestDto } from './dtos/request/auth-user-login-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async signUp(
    @Body() authUserRequestDto: AuthUserRequestDto,
    @Response() res: Res,
  ) {
    const data = await this.authService.register(authUserRequestDto);
    return res.json({
      data,
      status: data.status,
    });
  }

  @Post('login')
  async signin(
    @Body() authUserLoginRequestDto: AuthUserLoginRequestDto,
    @Response() res: Res,
  ) {
    const data = await this.authService.authenticate(authUserLoginRequestDto);
    return res.json({
      data,
      status: data.status,
    });
  }

}
