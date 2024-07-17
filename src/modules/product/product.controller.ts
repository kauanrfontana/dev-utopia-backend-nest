import { Request } from 'express';
import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { JwtPayload } from '../shared/interfaces/jwt-payload.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewEntity } from './entities/review.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('/products')
export class ProductController {
  constructor(
    private productService: ProductService,
    private reviewService: ReviewService,
  ) {}
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
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProductById(id);
  }

  @Get(':id/reviews')
  async getReviewsByProduct(
    @Req() req: Request,
    @Param('id', ParseIntPipe) productId: number,
    @Query('currentPage') currentPage: number,
    @Query('itemsPerPage') itemsPerPage: number,
  ) {
    const userId = (req.user as JwtPayload).sub;
    return this.reviewService.getReviewsByProduct(
      productId,
      userId,
      currentPage,
      itemsPerPage,
    );
  }

  @Post()
  async createProduct(
    @Req() req: Request,
    @Body() createProductDto: CreateProductDto,
  ) {
    const productEntity = new ProductEntity();
    Object.entries(createProductDto).forEach(([key, value]) => {
      if (key == 'id' || key == 'userId') return;
      productEntity[key] = value;
    });
    productEntity.createdAt = new Date();
    productEntity.userId = (req.user as JwtPayload).sub;
    return this.productService.createProduct(productEntity);
  }

  @Post(':id/reviews')
  async createReview(
    @Req() req: Request,
    @Param('id', ParseIntPipe) productId: number,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    const userId = (req.user as JwtPayload).sub;
    const reviewEntity = new ReviewEntity();
    reviewEntity.review = createReviewDto.review;
    reviewEntity.stars = createReviewDto.stars;
    reviewEntity.product = new ProductEntity();
    reviewEntity.product.id = productId;
    reviewEntity.user = new UserEntity();
    reviewEntity.user.id = userId;
    reviewEntity.createdAt = new Date();
    return this.reviewService.createReview(reviewEntity);
  }

  @Put(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) productId: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const productEntity = new ProductEntity();
    Object.entries(updateProductDto).forEach(([key, value]) => {
      if (key == 'id') return;
      productEntity[key] = value;
    });
    return this.productService.updateProduct(productId, productEntity);
  }

  @Put(':id/reviews/:reviewId')
  async updateReview(
    @Param('id', ParseIntPipe) productId: number,
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    const reviewEntity = new ReviewEntity();
    reviewEntity.product = new ProductEntity();
    reviewEntity.product.id = productId;
    reviewEntity.review = updateReviewDto.review;
    reviewEntity.stars = updateReviewDto.stars;
    reviewEntity.updatedAt = new Date();
    return this.reviewService.updateReview(reviewId, reviewEntity);
  }
}
