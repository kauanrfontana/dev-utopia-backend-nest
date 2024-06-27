import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';

@Controller('login')
export class AuthController {
  constructor() {}

  @Post()
  @UseGuards(LocalGuard)
  async login(@Req() req: Request) {
    return req.user;
  }
}
