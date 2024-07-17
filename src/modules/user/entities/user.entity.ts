import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from '../../role/entities/role.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', length: 200, nullable: false })
  name: string;

  @Column({ name: 'email', length: 200, nullable: false })
  email: string;

  @Column({ name: 'password', length: 200, nullable: false })
  password: string;

  @Column({
    name: 'state_id',
    nullable: true,
    transformer: {
      to: (value: string) => value,
      from: (value: string | null) => (value === null ? '' : value),
    },
  })
  stateId: number;

  @Column({
    name: 'city_id',
    nullable: true,
    transformer: {
      to: (value: string) => value,
      from: (value: string | null) => (value === null ? '' : value),
    },
  })
  cityId: number;

  @Column({
    name: 'address',
    length: 200,
    nullable: true,
    transformer: {
      to: (value: string) => value,
      from: (value: string | null) => (value === null ? '' : value),
    },
  })
  address: string;

  @Column({
    name: 'house_number',
    nullable: true,
    transformer: {
      to: (value: string) => value,
      from: (value: string | null) => (value === null ? '' : value),
    },
  })
  houseNumber: string;

  @Column({
    name: 'complement',
    length: 200,
    nullable: true,
    transformer: {
      to: (value: string) => value,
      from: (value: string | null) => (value === null ? '' : value),
    },
  })
  complement: string;

  @Column({
    name: 'zip_code',
    length: 8,
    nullable: true,
    transformer: {
      to: (value: string) => value,
      from: (value: string | null) => (value === null ? '' : value),
    },
  })
  zipCode: string;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: RoleEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
