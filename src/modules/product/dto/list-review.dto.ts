import { Expose } from 'class-transformer';

export class ListReviewDto {
  @Expose()
  id: number;

  @Expose()
  stars: number;

  @Expose()
  review: string;

  @Expose()
  productId: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  userName: string;

  @Expose()
  userId: number;
}
