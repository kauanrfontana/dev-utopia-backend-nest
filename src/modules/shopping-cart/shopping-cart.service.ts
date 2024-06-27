import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCartEntity } from './entities/shopping-cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCartEntity)
    private readonly shoppingCartRepository: Repository<ShoppingCartEntity>,
  ) {}

  async getShoppingCartByUserId(userId: number) {
    return this.shoppingCartRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }

  async addProductToShoppingCart(userId: number, productId: number) {
    return this.shoppingCartRepository.create({
      user: { id: userId },
      products: [{ id: productId }],
    });
  }

  async removeProductFromShoppingCart(userId: number, productId: number) {
    return this.shoppingCartRepository.delete({
      user: { id: userId },
      products: { id: productId },
    });
  }
}
