import { ShoppingCartService } from './shopping-cart.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from '../shared/interfaces/jwtPayload.interface';

@Controller('/shopping-carts')
export class ShoppingCartController {
  constructor(private shoppingCartService: ShoppingCartService) {}

  @Get()
  async getShoppingCartByUserId(@Req() req: Request) {
    const user = req.user as JwtPayload;
    const shoppingCart = await this.shoppingCartService.getShoppingCartByUserId(
      user.sub,
    );
    return { data: shoppingCart };
  }

  @Post()
  async addProductToShoppingCart(
    @Req() req: Request,
    @Body('productId', ParseIntPipe) productId: number,
  ) {
    const user = req.user as JwtPayload;
    await this.shoppingCartService.addProductToShoppingCart(
      user.sub,
      productId,
    );
    return {
      message: 'Product added to shopping cart',
    };
  }

  @Delete(':id')
  async removeProductFromShoppingCart(
    @Req() req: Request,
    @Param('id', ParseIntPipe) productId: number,
  ) {
    const user = req.user as JwtPayload;
    await this.shoppingCartService.removeProductFromShoppingCart(
      user.sub,
      productId,
    );
    return {
      message: 'Product removed from shopping cart',
    };
  }
}
