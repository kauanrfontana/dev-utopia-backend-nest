import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product_reviews')
export class ReviewEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'stars', type: 'int', nullable: false })
  stars: number;

  @Column({ name: 'review', type: 'varchar', length: 500, nullable: true })
  review: string;

  @ManyToOne(() => UserEntity, { cascade: true, nullable: false, eager: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => ProductEntity, { cascade: true, nullable: false })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
