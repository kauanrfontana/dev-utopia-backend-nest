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
import { JwtPayload } from '../shared/interfaces/jwt-payload.interface';

@Controller('/shopping-carts')
export class ShoppingCartController {
  constructor(private shoppingCartService: ShoppingCartService) {}

  @Get()
  async getShoppingCartByUserId(@Req() req: Request) {
    const user = req.user as JwtPayload;
    return this.shoppingCartService.getShoppingCartByUserId(user.sub);
  }

  @Post('add-product')
  async addProductToShoppingCart(
    @Req() req: Request,
    @Body('productId', ParseIntPipe) productId: number,
  ) {
    const user = req.user as JwtPayload;
    return this.shoppingCartService.addProductToShoppingCart(
      user.sub,
      productId,
    );
  }

  @Delete(':id')
  async removeProductFromShoppingCart(
    @Req() req: Request,
    @Param('id', ParseIntPipe) productId: number,
  ) {
    const user = req.user as JwtPayload;
    return this.shoppingCartService.removeProductFromShoppingCart(
      user.sub,
      productId,
    );
  }
}
