import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'O campo nome é obrigatório!' })
  name: string;

  @IsUrl({}, { message: 'A URL da imagem é inválida!' })
  urlImage: string;

  @IsNotEmpty({ message: 'A descrição é obrigatória!' })
  description: string;

  @IsNotEmpty({ message: 'O campo preço é obrigatório!' })
  @IsNumber({}, { message: 'O preço deve ser um número!' })
  price: number;

  @IsNotEmpty({ message: 'O campo id do estado é obrigatório!' })
  @IsNumber({}, { message: 'O id do estado deve ser um número!' })
  stateId: number;

  @IsNotEmpty({ message: 'O campo id do cidade é obrigatório!' })
  @IsNumber({}, { message: 'O id do cidade deve ser um número!' })
  cityId: number;

  @IsNotEmpty({ message: 'O campo endereço é obrigatório!' })
  address: string;

  @IsNotEmpty({ message: 'O campo número da casa é obrigatório!' })
  houseNumber: string;

  @IsString({ message: 'O complemento deve ser uma string!' })
  complement: string;

  @IsNotEmpty({ message: 'O campo CEP é obrigatório!' })
  zipCode: string;

  @IsNotEmpty({ message: 'O campo id do usuário é obrigatório!' })
  userId: number;
}
