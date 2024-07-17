import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty({ message: 'O campo senha atual é obrigatório.' })
  currentPassword: string;

  @IsNotEmpty({ message: 'O campo nova senha é obrigatório.' })
  newPassword: string;
}
