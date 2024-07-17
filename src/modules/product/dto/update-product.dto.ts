import { IsOptional, IsNumber, IsString, IsUrl } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsUrl({}, { message: 'A URL da imagem é inválida!' })
  urlImage: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsNumber({}, { message: 'O preço deve ser um número!' })
  price: number;

  @IsOptional()
  @IsNumber({}, { message: 'O id do estado deve ser um número!' })
  stateId: number;

  @IsOptional()
  @IsNumber({}, { message: 'O id do cidade deve ser um número!' })
  cityId: number;

  @IsOptional()
  address: string;

  @IsOptional()
  houseNumber: string;

  @IsString({ message: 'O complemento deve ser uma string!' })
  complement: string;

  @IsOptional()
  zipCode: string;

  @IsOptional()
  userId: number;
}
