import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { comparePassword, hashPassword } from './../services/hash.service';
import { User } from './../users/schemas/user.schema';
import { UserRepository } from './../users/users.repository';
import { AuthUserRequestDto } from './dtos/request/auth-user-request.dto';
import { AuthUserLoginRequestDto } from './dtos/request/auth-user-login-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
  ) {}

  // register
  async register(user: AuthUserRequestDto) {
    console.log(user);

    return this.usersService.createUser(user);
  }

  // login
  async authenticate(data: AuthUserLoginRequestDto): Promise<any> {
        
    return await this.usersService.findByEmailAuth(data);
  }
}
