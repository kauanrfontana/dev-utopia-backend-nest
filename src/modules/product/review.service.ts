import { PurchasedItemService } from './../purchased-item/purchased-item.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { IResponseDataPaginated } from '../shared/interfaces/response-data-paginated.interface';
import { ListReviewDto } from './dto/list-review.dto';
import { plainToInstance } from 'class-transformer';
import { IResponseMessage } from '../shared/interfaces/response-message.interface';

type reviewInfo = {
  reviews: ListReviewDto[];
  wasPurchased: boolean;
};

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    private purchasedItemService: PurchasedItemService,
  ) {}

  async getReviewsByProduct(
    productId,
    userId,
    currentPage,
    itemsPerPage,
  ): Promise<IResponseDataPaginated<reviewInfo>> {
    const [savedReviews, total] = await this.reviewRepository.findAndCount({
      where: { product: { id: productId } },
      take: itemsPerPage,
      skip: (currentPage - 1) * itemsPerPage,
    });
    const flattenedReviews = savedReviews.map((review) => {
      const userId = review.user.id;
      const userName = review.user?.name ?? '';
      return { ...review, userName, userId };
    });

    const reviewsList = plainToInstance(ListReviewDto, flattenedReviews, {
      excludeExtraneousValues: true,
    });

    const productwasPurchased =
      await this.purchasedItemService.productWasPurchasedItemByUser(
        productId,
        userId,
      );

    return {
      data: { reviews: reviewsList, wasPurchased: productwasPurchased },
      totalItems: total,
    };
  }

  async createReview(review: ReviewEntity): Promise<IResponseMessage> {
    await this.reviewRepository.save(review);
    return { message: 'Avaliação criada com sucesso!' };
  }

  async updateReview(
    reviewId: number,
    review: ReviewEntity,
  ): Promise<IResponseMessage> {
    await this.reviewRepository.update(reviewId, review);
    return { message: 'Avaliação atualizada com sucesso!' };
  }
}
