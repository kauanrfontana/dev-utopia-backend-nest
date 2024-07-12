import { ShoppingCartEntity } from 'src/modules/shopping-cart/entities/shopping-cart.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', length: 200, nullable: false })
  name: string;

  @Column({
    name: 'url_image',
    length: 500,
    nullable: false,
    transformer: {
      to: (value: string) => value,
      from: (value: string | null) => (value === null ? '' : value),
    },
  })
  urlImage: string;

  @Column({
    name: 'description',
    length: 400,
    nullable: false,
    transformer: {
      to: (value: string) => value,
      from: (value: string | null) => (value === null ? '' : value),
    },
  })
  description: string;

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'state_id', nullable: false })
  stateId: number;

  @Column({ name: 'city_id', nullable: false })
  cityId: number;

  @Column({
    name: 'address',
    length: 200,
    nullable: false,
    transformer: {
      to: (value: string) => value,
      from: (value: string | null) => (value === null ? '' : value),
    },
  })
  address: string;

  @Column({ name: 'house_number', nullable: false })
  houseNumber: number;

  @Column({ name: 'complement', length: 200, nullable: false })
  complement: string;

  @Column({ name: 'zip_code', length: 8, nullable: false })
  zipCode: string;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToMany(() => ShoppingCartEntity, (shoppingCart) => shoppingCart.products)
  shoppingCarts: ShoppingCartEntity[];
}
