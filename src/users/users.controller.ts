import {
  Body,
  Controller,
  Patch,
  Response,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Response as Res, Request as Req } from 'express';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { PecuniaryUserDto } from './dto/request/pecuniary-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('/update')
  async updatePecuniaryUser(
    @Request() req,
    @Body('pecuniary') pecuniaryUserDto: Partial<PecuniaryUserDto>,
    @Response() res: Res,
  ) {
    const { userId } = req.user;
    const data = await this.usersService.updatePecuniary(
      userId,
      pecuniaryUserDto,
    );

    return res.json({
      data,
    });
  }
}
