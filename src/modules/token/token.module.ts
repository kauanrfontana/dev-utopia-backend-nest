import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './tokens.service';
import { TokenEntity } from './entities/token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TokenEntity])],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService, TypeOrmModule],
})
export class TokenModule {}
