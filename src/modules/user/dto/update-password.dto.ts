import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty({ message: 'O campo senha atual é obrigatório.' })
  @IsString({ message: 'O campo senha atual deve ser uma string.' })
  currentPassword: string;

  @IsNotEmpty({ message: 'O campo nova senha é obrigatório.' })
  @IsString({ message: 'O campo senha atual deve ser uma string.' })
  newPassword: string;
}
