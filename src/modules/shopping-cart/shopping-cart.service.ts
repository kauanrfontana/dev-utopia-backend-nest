import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCartEntity } from './entities/shopping-cart.entity';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { IResponseMessage } from '../shared/interfaces/response-message.interface';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCartEntity)
    private readonly shoppingCartRepository: Repository<ShoppingCartEntity>,
    private productService: ProductService,
  ) {}

  async getShoppingCartByUserId(userId: number) {
    return this.shoppingCartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user', 'products'],
    });
  }

  async createShoppingCart(userId: number) {
    await this.shoppingCartRepository.create({ user: { id: userId } });
  }

  async addProductToShoppingCart(
    userId: number,
    productId: number,
  ): Promise<IResponseMessage> {
    const shoppingCart = await this.shoppingCartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['products'],
    });

    const productAlreadyInCart = !!shoppingCart.products.find(
      (product) => product.id === productId,
    );

    if (productAlreadyInCart) {
      throw new BadRequestException('Produto já está no carrinho');
    }

    const product = (await this.productService.getProductById(productId)).data;

    if (!shoppingCart || !product) {
      throw new HttpException('Carrinho ou produto não encontrado', 404);
    }

    shoppingCart.products.push(product);
    await this.shoppingCartRepository.save(shoppingCart);
    return {
      message: 'Produto adicionado ao carrinho com sucesso!',
    };
  }

  async removeProductFromShoppingCart(
    userId: number,
    productId: number,
  ): Promise<IResponseMessage> {
    const shoppingCart = await this.shoppingCartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['products'],
    });

    shoppingCart.products = shoppingCart.products.filter(
      (product) => product.id !== productId,
    );

    if (!shoppingCart) {
      throw new HttpException('Carrinho ou produto não encontrado', 404);
    }

    await this.shoppingCartRepository.save(shoppingCart);
    return {
      message: 'Produto removido do carrinho com sucesso!',
    };
  }
}
