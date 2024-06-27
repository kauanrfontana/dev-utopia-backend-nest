import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsString,
} from 'class-validator';
import { UniqueEmail } from '../validation/uniqueEmail.validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @IsEmail(undefined, { message: 'email informado é inválido' })
  @UniqueEmail({ message: 'Já existe um usuáro com este e-mail' })
  email: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsInt()
  @IsOptional()
  stateId: number;

  @IsInt()
  @IsOptional()
  cityId: number;

  @IsInt()
  @IsOptional()
  houseNumber: number;

  @IsString()
  @IsOptional()
  complement: string;

  @IsString()
  @IsOptional()
  zipCode: string;
}
