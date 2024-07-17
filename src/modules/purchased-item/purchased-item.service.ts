import { InjectRepository } from '@nestjs/typeorm';
import { CreatePurchasedDto } from './dto/create-purchased.dto';
import { Injectable } from '@nestjs/common';
import { PurchasedItemEntity } from './entities/purchased-item.entity';
import { Repository } from 'typeorm';
import { IResponseMessage } from '../shared/interfaces/response-message.interface';

@Injectable()
export class PurchasedItemService {
  constructor(
    @InjectRepository(PurchasedItemEntity)
    private readonly purchasedItemRepository: Repository<PurchasedItemEntity>,
  ) {}

  async insertPurchase(
    userId: number,
    createPurchasedDto: CreatePurchasedDto,
  ): Promise<IResponseMessage> {
    createPurchasedDto.products.forEach(async (product) => {
      await this.purchasedItemRepository.save({
        userId: userId,
        productId: product.id,
        purchasedDate: new Date(),
      });
    });
    return { message: 'Compra realizada com sucesso!' };
  }

  async productWasPurchasedItemByUser(
    productId: number,
    userId: number,
  ): Promise<boolean> {
    return !!(await this.purchasedItemRepository.findOne({
      where: { productId: productId, userId: userId },
    }));
  }
}
