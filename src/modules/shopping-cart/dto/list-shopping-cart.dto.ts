import { ProductEntity } from 'src/modules/product/entities/product.entity';

export class ListShoppingCartDto {
  readonly products: ProductEntity[];
  readonly qtdProducts: number;
  readonly totalPrice: number;
  readonly userId: number;
}
