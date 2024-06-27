import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { UniqueEmail } from '../validation/uniqueEmail.validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @IsEmail(undefined, { message: 'O email informado é inválido' })
  @UniqueEmail({ message: 'Já existe um usuáro com este e-mail' })
  email: string;

  @MinLength(8, { message: 'A senha deve conter pelo menos 8 caracteres' })
  password: string;
}
