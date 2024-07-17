import { IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @IsOptional()
  address: string;

  @IsInt()
  @IsOptional()
  stateId: number;

  @IsInt()
  @IsOptional()
  cityId: number;

  @IsOptional()
  houseNumber: string;

  @IsOptional()
  complement: string;

  @IsOptional()
  zipCode: string;
}
