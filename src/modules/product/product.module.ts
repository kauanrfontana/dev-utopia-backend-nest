import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductEntity } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewService } from './review.service';
import { ReviewEntity } from './entities/review.entity';
import { PurchasedItemModule } from '../purchased-item/purchased-item.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, ReviewEntity]),
    PurchasedItemModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ReviewService],
  exports: [ProductService, TypeOrmModule],
})
export class ProductModule {}
