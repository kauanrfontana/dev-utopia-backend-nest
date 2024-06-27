import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../shared/interfaces/jwtPayload.interface';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    const users = await this.userService.getUsers();
    return { data: users };
  }

  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ) {
    let userId = 0;
    if (id !== 0) {
      if (isNaN(id)) {
        throw new BadRequestException(
          'Não foi possível consultar o usuário, parâmetro informado é inválido!',
        );
      }
      userId = id;
    } else {
      const userData = req.user as JwtPayload;
      userId = userData.sub;
    }
    const user = await this.userService.getUserById(userId);
    return { data: user };
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    const userEntity = new UserEntity();
    userEntity.name = user.name;
    userEntity.email = user.email;
    userEntity.password = await bcrypt.hash(user.password, 10);
    userEntity.createdAt = new Date();
    await this.userService.createUser(userEntity);
    return {
      message: 'Success! User created!',
    };
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    const userEntity = new UserEntity();
    userEntity.name = user.name;
    userEntity.email = user.email;
    Object.entries(user).forEach(([key, value]) => {
      if (key == 'id') return;
      userEntity[key] = value;
    });
    await this.userService.updateUser(id, userEntity);

    return {
      message: 'Success! User updated!',
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
    return {
      message: 'Success! User deleted!',
    };
  }
}
