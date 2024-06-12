import { ProductService } from './product.service';
import { Controller, Get } from '@nestjs/common';

@Controller('/products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  async getProducts() {
    return this.productService.getProducts();
  }
  //   @Post()
  /*  async createProduct(@Body() product: CreateProductDTO) {
    const productEntity = new ProductEntity();
    productEntity.id = uuid();
    productEntity.userId = product.userId;
    productEntity.name = product.name;
    productEntity.price = product.price;
    productEntity.quantity = product.quantity;
    productEntity.description = product.description;
    productEntity.category = product.category;
    productEntity.caracteristics = product.caracteristics;
    productEntity.images = product.images;
    this.productService.createProduct(productEntity);

    return {
      product: productEntity,
      message: 'Success! Product created!',
    };
  }

  @Get()
  async getProducts(): Promise<ListProductDTO[]> {
    return this.productService.getProducts();
  }

  @Patch('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() productUpdatedData: UpdateProductDTO,
  ) {
    const product = await this.productService.updateProduct(
      id,
      productUpdatedData,
    );

    return {
      product: product,
      message: 'Success! Product updated!',
    };
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    this.productService.deleteProduct(id);
    return {
      message: 'Success! Product deleted!',
    };
  } */
}
