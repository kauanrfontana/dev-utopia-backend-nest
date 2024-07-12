import { Expose } from 'class-transformer';

export class ListProductsDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  urlImage: string;

  @Expose()
  price: number;
}
