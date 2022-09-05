import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import * as bcrypt from 'bcrypt';
import { comparePassword, hashPassword } from './../services/hash.service';
import { User } from './../users/schemas/user.schema';
import { UserRepository } from './../users/users.repository';
import { AuthUserRequestDto } from './dtos/request/auth-user-request.dto';
import { AuthUserLoginRequestDto } from './dtos/request/auth-user-login-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private usersService: UsersService,
  ) {}

  // register
  async register(user: AuthUserRequestDto) {
    console.log(user);

    const { email, pecuniary, image, password } = user;

    const hashedPassword = hashPassword(password);

    const newUser = await this.userRepository.createOne({
      email,
      pecuniary,
      image,
      password: hashedPassword,
    });

    if (!newUser) {
      throw new Error('user creation failed');
    }

    return this.usersService.buildUserResponse([newUser, 'success']);
  }

  // login
  async authenticate(data: AuthUserLoginRequestDto): Promise<any> {
    const { email, password } = data;
    
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('user not found');
    }
    const passwordCheck = comparePassword(password, user.password);

    if (!passwordCheck) {
      throw new Error('authentication failed');
    }

    const usernewBuild = this.usersService.buildUserResponse([user, 'success']);
    const token = await this.usersService.createJWT(user);

    return { ...usernewBuild, token };
  }
}
