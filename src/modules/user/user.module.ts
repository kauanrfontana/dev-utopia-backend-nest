import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UniqueEmailValidator } from './validation/uniqueEmail.validator';
import { RoleModule } from '../role/role.module';
import { ShoppingCartModule } from '../shopping-cart/shopping-cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    RoleModule,
    ShoppingCartModule,
  ],
  controllers: [UserController],
  providers: [UserService, UniqueEmailValidator],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
