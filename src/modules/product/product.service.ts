import { Injectable } from '@nestjs/common';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ListProductsDto } from './dto/list-products.dto';
import { IResponseDataPaginated } from '../shared/interfaces/response-data-paginated.interface';
import { plainToInstance } from 'class-transformer';
import { IResponseData } from '../shared/interfaces/response-data.interface';
import { IResponseMessage } from '../shared/interfaces/response-message.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getAllProducts(
    currentPage: number,
    itemsPerPage: number,
    orderByColumn: string = 'created_at',
    orderByType: 'ASC' | 'DESC' = 'DESC',
    searchText: string,
  ): Promise<IResponseDataPaginated<ListProductsDto[]>> {
    const [savedProducts, total] = await this.productRepository.findAndCount({
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
      order: {
        [orderByColumn]: orderByType,
      },
      where: {
        name: Like(`%${searchText}%`),
      },
    });
    const productsList = plainToInstance(ListProductsDto, savedProducts, {
      excludeExtraneousValues: true,
    });
    return { data: productsList, totalItems: total };
  }

  async getMyProducts(
    userId: number,
    currentPage: number,
    itemsPerPage: number,
    orderByColumn: string = 'created_at',
    orderByType: 'ASC' | 'DESC' = 'DESC',
    searchText: string,
  ): Promise<IResponseDataPaginated<ListProductsDto[]>> {
    const [savedProducts, total] = await this.productRepository.findAndCount({
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
      order: {
        [orderByColumn]: orderByType,
      },
      where: {
        name: Like(`%${searchText}%`),
        userId: userId,
      },
    });
    const productsList = plainToInstance(ListProductsDto, savedProducts, {
      excludeExtraneousValues: true,
    });
    return { data: productsList, totalItems: total };
  }

  async getProductById(id: number): Promise<IResponseData<ProductEntity>> {
    const savedProduct = await this.productRepository.findOne({
      where: { id },
    });

    return { data: savedProduct };
  }

  async createProduct(productEntity: ProductEntity): Promise<IResponseMessage> {
    await this.productRepository.save(productEntity);
    return { message: 'Produto criado com sucesso!' };
  }

  async updateProduct(
    productId: number,
    productEntity: ProductEntity,
  ): Promise<IResponseMessage> {
    await this.productRepository.update(productId, productEntity);
    return { message: 'Produto atualizado com sucesso!' };
  }
}
