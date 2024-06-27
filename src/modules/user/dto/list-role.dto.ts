import { Expose } from 'class-transformer';

export class ListRoleDto {
  @Expose()
  readonly name: string;

  @Expose()
  readonly category: number;
}
