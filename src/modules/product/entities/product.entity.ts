import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', length: 200, nullable: false })
  name: string;

  @Column({ name: 'url_image', length: 500, nullable: false })
  urlImage: string;

  @Column({ name: 'description', length: 400, nullable: false })
  description: string;

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'state_id', nullable: false })
  stateId: number;

  @Column({ name: 'city_id', nullable: false })
  cityId: number;

  @Column({ name: 'address', length: 200, nullable: false })
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
}
