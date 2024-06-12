import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SqlServerConfigService } from './config/sqlserver.config.service';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    UserModule,
    ProductModule,
    TypeOrmModule.forRootAsync({
      useClass: SqlServerConfigService,
      inject: [SqlServerConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
