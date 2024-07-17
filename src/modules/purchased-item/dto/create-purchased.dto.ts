import { IsArray, IsNotEmpty } from 'class-validator';
import { ProductEntity } from 'src/modules/product/entities/product.entity';

export class CreatePurchasedDto {
  @IsArray()
  @IsNotEmpty({ message: 'O campo produtos é obrigatório' })
  products: ProductEntity[];
}
