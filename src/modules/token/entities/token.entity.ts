import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tokens')
export class TokenEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => UserEntity, { cascade: true, nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'token', length: 1000, nullable: false })
  token: string;

  @Column({ name: 'refresh_token', length: 1000, nullable: false })
  refreshToken: string;

  @Column({ name: 'expired_at', nullable: false })
  expiredAt: Date;

  @Column({ name: 'active', nullable: false, default: 1 })
  active: number;
}
