import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('shopping_carts')
export class ShoppingCartEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @OneToMany(() => ProductEntity, (product) => product.shoppingCart, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  products: ProductEntity[];
}
