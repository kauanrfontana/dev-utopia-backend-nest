import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { ListUserDto } from './dto/list-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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

  async createUser(userEntity: UserEntity): Promise<void> {
    try {
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
