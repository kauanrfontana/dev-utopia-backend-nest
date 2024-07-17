import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty({ message: 'O campo avaliação é obrigatório' })
  @IsInt({ message: 'O campo estrelas deve ser um número inteiro' })
  stars: number;

  @IsNotEmpty({ message: 'O campo estrelas é obrigatório' })
  review: string;
}
