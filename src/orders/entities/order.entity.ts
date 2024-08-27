import { UserEntity } from 'src/users/entities/user.entity';
import { OrderStatus } from 'src/utility/common/order-status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { ShippingEntity } from './shipping.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  orderAt: Timestamp;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PROCESSING })
  status: string;

  @Column({ nullable: true })
  shippedAt: Date;

  @Column({ nullable: true })
  deliveredAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.ordersUpdateBy)
  updatedBy: UserEntity;

  @OneToOne(() => ShippingEntity, (ship) => ship.order, { cascade: true })
  @JoinColumn()
  shippingAddress: ShippingEntity;
}
