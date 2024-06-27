import { Expose } from 'class-transformer';

export class ListUserDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly name: string;

  @Expose()
  readonly email: string;

  @Expose()
  readonly address: string;

  @Expose()
  readonly stateId: number;

  @Expose()
  readonly cityId: number;

  @Expose()
  readonly houseNumber: string;

  @Expose()
  readonly complement: string;

  @Expose()
  readonly zipCode: string;

  @Expose()
  readonly role: string;

  @Expose()
  readonly roleCategory: number;
}
