import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cart } from '../../cart/models/cart.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => Cart, { onDelete: 'CASCADE' })
  cart: Cart;

  @Column('json')
  payment: any;

  @Column('json')
  delivery: any;

  @Column('text')
  comments: string;

  @Column('text')
  status: string;

  @Column('numeric')
  total: number;

  @Column({ type: 'date' })
  created_at: Date;

  @Column({ type: 'date' })
  updated_at: Date;
}
