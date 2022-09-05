import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';
import { UserResponse } from './dto/response/user-response.dto';
import { PecuniaryUserDto } from './dto/request/pecuniary-user.dto';

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

  async createJWT(user: any): Promise<string> {
    const payload = { sub: user._id, iat: Date.now() };
    return this.jwtService.sign(payload);
  }

  // DTO
  buildUserResponse(data: any): UserResponse {
    return {
      email: data[0]['email'],
      pecuniary: data[0]['pecuniary'],
      image: data[0]['image'],
      status: data[1]['state'],
      created_at: data[0]['created_at'],
    };
  }
}
