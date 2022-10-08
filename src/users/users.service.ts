import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';
import { UserResponse } from './dto/response/user-response.dto';
import { PecuniaryUserDto } from './dto/request/pecuniary-user.dto';
import { comparePassword, hashPassword } from './../services/hash.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async updatePecuniary(
    userId,
    pecuniary: Partial<PecuniaryUserDto>,
  ): Promise<UserResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new HttpException(
        {
          data: {},
          status: 'fail',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const newUser = await this.userRepository.updateOne(
      { _id: userId },
      {
        pecuniary: (user.pecuniary + (pecuniary as number)) as number,
      },
    );
    return this.buildUserResponse([newUser, 'success']);
  }

  async findOne(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new HttpException(
        {
          data: {},
          status: 'fail',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async findByEmailAuth(data) {
    const { email, password } = data;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpException(
        {
          data: {},
          status: 'fail',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const passwordCheck = comparePassword(password, user.password);

    if (!passwordCheck) {
      throw new Error('authentication failed');
    }

    const usernewBuild = this.buildUserResponse([user, 'success']);
    const token = await this.createJWT(user);
    return { ...usernewBuild, token };
  }

  async createUser(user) {
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

    return this.buildUserResponse([newUser, 'success']);
  }

  async createJWT(user: any): Promise<string> {
    const payload = { sub: user._id, iat: Date.now() };
    return this.jwtService.sign(payload);
  }

  // DTO
  private buildUserResponse(data: any): UserResponse {
    return {
      email: data[0]['email'],
      pecuniary: data[0]['pecuniary'],
      image: data[0]['image'],
      status: data[1]['state'],
      created_at: data[0]['created_at'],
    };
  }
}
