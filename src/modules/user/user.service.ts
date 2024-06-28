import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { ListUserDto } from './dto/list-user.dto';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleService } from '../role/role.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private roleService: RoleService,
  ) {}

  async getUsers(): Promise<ListUserDto[]> {
    const users = await this.userRepository.find({ relations: ['role'] });
    const flattenedUsers = users.map((user) => ({
      ...user,
      role: user.role.name,
      roleCategory: user.role.category,
    }));
    return plainToInstance(ListUserDto, flattenedUsers, {
      excludeExtraneousValues: true,
    });
  }

  async getUserById(id: number): Promise<ListUserDto> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['role'],
    });
    const flattenedUser = {
      ...user,
      role: user.role.name,
      roleCategory: user.role.category,
    };
    return plainToInstance(ListUserDto, flattenedUser, {
      excludeExtraneousValues: true,
    });
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    try {
      const userEntity = new UserEntity();
      userEntity.name = createUserDto.name;
      userEntity.email = createUserDto.email;
      userEntity.password = await bcrypt.hash(createUserDto.password, 10);
      userEntity.createdAt = new Date();
      userEntity.role = await this.roleService.getRoleByCategory(1);
      await this.userRepository.save(userEntity);
    } catch (error) {
      throw new InternalServerErrorException(
        'Não foi possível inserir o usuário no momento. Por favor, tente mais tarde.',
      );
    }
  }

  async updateUser(id: number, userEntity: UserEntity): Promise<void> {
    await this.userRepository.update(id, userEntity);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
