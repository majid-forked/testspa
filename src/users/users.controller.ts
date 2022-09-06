import {
  Body,
  Controller,
  Patch,
  Response,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { Response as Res, Request as Req } from 'express';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { PecuniaryUserDto } from './dto/request/pecuniary-user.dto';
import { ConfigurationService } from './../configuration/configuration.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigurationService,
  ) {}

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

  @Get('/config')
  getConfiguration(): void {
    this.configService.getDBUrl();
  }
}
