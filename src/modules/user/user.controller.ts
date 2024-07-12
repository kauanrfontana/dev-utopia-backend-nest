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
  Query,
  Req,
} from '@nestjs/common';
import { JwtPayload } from '../shared/interfaces/jwt-payload.interface';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(
    @Query('currentPage') currentPage: number,
    @Query('itemsPerPage') itemsPerPage: number,
    @Query('name') name: string,
  ) {
    return this.userService.getUsers(currentPage, itemsPerPage, name);
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
    return this.userService.getUserById(userId);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put('password')
  async updatePassword(
    @Req() req: Request,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const userData = req.user as JwtPayload;
    return this.userService.updatePassword(updatePasswordDto, userData);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userEntity = new UserEntity();
    userEntity.name = updateUserDto.name;
    userEntity.email = updateUserDto.email;
    Object.entries(updateUserDto).forEach(([key, value]) => {
      if (key == 'id') return;
      userEntity[key] = value;
    });
    return this.userService.updateUser(id, userEntity);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
