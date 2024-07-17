import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { ListUserDto } from './dto/list-user.dto';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleService } from '../role/role.service';
import * as bcrypt from 'bcrypt';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { IResponseMessage } from '../shared/interfaces/response-message.interface';
import { IResponseData } from '../shared/interfaces/response-data.interface';
import { IResponseDataPaginated } from '../shared/interfaces/response-data-paginated.interface';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { JwtPayload } from '../shared/interfaces/jwt-payload.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private roleService: RoleService,
    private shoppingCartService: ShoppingCartService,
  ) {}

  async getUsers(
    currentPage: number,
    itemsPerPage: number,
    name: string,
  ): Promise<IResponseDataPaginated<ListUserDto[]>> {
    const [users, total] = await this.userRepository.findAndCount({
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
      where: {
        name: Like(`%${name}%`),
      },
      relations: ['role'],
    });
    const flattenedUsers = users.map((user) => ({
      ...user,
      role: user.role.name,
      roleCategory: user.role.category,
    }));
    const usersListed = plainToInstance(ListUserDto, flattenedUsers, {
      excludeExtraneousValues: true,
    });
    return { data: usersListed, totalItems: total };
  }

  async getUserById(id: number): Promise<IResponseData<ListUserDto>> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['role'],
    });
    const flattenedUser = {
      ...user,
      role: user.role.name,
      roleCategory: user.role.category,
    };
    const userListed = plainToInstance(ListUserDto, flattenedUser, {
      excludeExtraneousValues: true,
    });
    return { data: userListed };
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<IResponseMessage> {
    try {
      const userEntity = new UserEntity();
      userEntity.name = createUserDto.name;
      userEntity.email = createUserDto.email;
      userEntity.password = await bcrypt.hash(createUserDto.password, 10);
      userEntity.createdAt = new Date();
      userEntity.role = await this.roleService.getRoleByCategory(1);
      await this.userRepository.save(userEntity);
      await this.shoppingCartService.createShoppingCart(userEntity.id);
      return {
        message: 'Usuário criado com sucesso!',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Não foi possível inserir o usuário no momento. Por favor, tente mais tarde.',
      );
    }
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<IResponseMessage> {
    const userEntity = new UserEntity();
    userEntity.name = updateUserDto.name;

    userEntity.address = updateUserDto.address;

    userEntity.stateId = updateUserDto.stateId;

    userEntity.cityId = updateUserDto.cityId;

    userEntity.houseNumber = updateUserDto.houseNumber;

    userEntity.complement = updateUserDto.complement;

    userEntity.zipCode = updateUserDto.zipCode;
    await this.userRepository.update(id, userEntity);
    return {
      message: 'Usuário atualizado com sucesso!',
    };
  }

  async updatePassword(
    updateUserDto: UpdatePasswordDto,
    userData: JwtPayload,
  ): Promise<IResponseMessage> {
    if (
      !this.validateUser({
        email: userData.email,
        password: updateUserDto.currentPassword,
      })
    ) {
      throw new BadRequestException(
        'Senha atual informada, não corresponde com a cadastrada em nosso sistema!',
      );
    }

    const newPassword = await bcrypt.hash(updateUserDto.newPassword, 10);
    await this.userRepository.update(userData.sub, { password: newPassword });
    return {
      message: 'Senha atualizada com sucesso!',
    };
  }

  async deleteUser(id: number): Promise<IResponseMessage> {
    await this.userRepository.delete(id);
    return {
      message: 'Usuário deletado com sucesso!',
    };
  }

  async validateUser({ email, password }): Promise<UserEntity> {
    const user = await this.getUserByEmail(email);

    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return null;
    }

    return user;
  }
}
