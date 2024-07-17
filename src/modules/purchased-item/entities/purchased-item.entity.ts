import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('purchased_items')
export class PurchasedItemEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'purchase_date' })
  purchasedDate: Date;
}
