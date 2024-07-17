import { Module } from '@nestjs/common';
import { PurchasedItemController } from './purchased-item.controller';
import { PurchasedItemService } from './purchased-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchasedItemEntity } from './entities/purchased-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchasedItemEntity])],
  controllers: [PurchasedItemController],
  providers: [PurchasedItemService],
  exports: [PurchasedItemService, TypeOrmModule],
})
export class PurchasedItemModule {}
