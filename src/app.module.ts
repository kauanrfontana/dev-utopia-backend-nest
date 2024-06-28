import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SqlServerConfigService } from './config/sqlserver.config.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RefreshTokenMiddleware } from './middlewares/refresh-token.middleware';
import { TokenModule } from './modules/token/token.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt.guard';
import { ShoppingCartModule } from './modules/shopping-cart/shopping-cart.module';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: SqlServerConfigService,
      inject: [SqlServerConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    ProductModule,
    AuthModule,
    TokenModule,
    ShoppingCartModule,
    RoleModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RefreshTokenMiddleware)
      .exclude(
        { path: 'login', method: RequestMethod.ALL },
        { path: 'users', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
