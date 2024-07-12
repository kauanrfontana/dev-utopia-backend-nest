import { Request } from 'express';
import { ProductService } from './product.service';
import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { JwtPayload } from '../shared/interfaces/jwt-payload.interface';

@Controller('/products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  async getAllProducts(
    @Query('orderColumn') orderColumn: string,
    @Query('orderType') orderType: 'ASC' | 'DESC',
    @Query('currentPage') currentPage: number,
    @Query('itemsPerPage') itemsPerPage: number,
    @Query('searchText') searchText: string,
  ) {
    return this.productService.getAllProducts(
      currentPage,
      itemsPerPage,
      orderColumn,
      orderType,
      searchText,
    );
  }

  @Get('my')
  async getMyProducts(
    @Req() req: Request,
    @Query('orderColumn') orderColumn: string,
    @Query('orderType') orderType: 'ASC' | 'DESC',
    @Query('currentPage') currentPage: number,
    @Query('itemsPerPage') itemsPerPage: number,
    @Query('searchText') searchText: string,
  ) {
    const userId = (req.user as JwtPayload).sub;
    return this.productService.getMyProducts(
      userId,
      currentPage,
      itemsPerPage,
      orderColumn,
      orderType,
      searchText,
    );
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }
}
