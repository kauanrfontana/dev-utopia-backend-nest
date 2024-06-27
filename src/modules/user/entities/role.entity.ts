import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'category', nullable: false })
  category: number;

  @Column({ name: 'name', length: 50, nullable: false })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}
