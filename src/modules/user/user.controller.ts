import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() user: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.name = user.name;
    userEntity.email = user.email;
    userEntity.password = await bcrypt.hash(user.password, 10);
    this.userService.createUser(userEntity);

    return {
      message: 'Success! User created!',
    };
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDTO,
  ) {
    const userEntity = new UserEntity();
    userEntity.name = user.name;
    userEntity.email = user.email;
    Object.entries(user).forEach(([key, value]) => {
      if (key == 'id') return;
      userEntity[key] = value;
    });
    this.userService.updateUser(id, userEntity);

    return {
      message: 'Success! User created!',
    };
  }
  /*

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() userUpdatedData: UpdateUserDTO,
  ) {
    const user = await this.userService.updateUser(
      id,
      userUpdatedData,
    );

    return {
      user: user,
      message: 'Success! User updated!',
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    this.userService.deleteUser(id);
    return {
      message: 'Success! User deleted!',
    };
  } */
}
