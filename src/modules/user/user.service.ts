import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUsers() {
    return this.userRepository.find();
  }

  async getUserById(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(userEntity: UserEntity) {
    await this.userRepository.save(userEntity);
  }

  async updateUser(id: number, userEntity: UserEntity) {
    await this.userRepository.update(id, userEntity);
  }
}
