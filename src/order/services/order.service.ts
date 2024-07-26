import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../models/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(orderData: Partial<Order>): Promise<Order> {
    const order = this.orderRepository.create(orderData);
    return this.orderRepository.save(order);
  }

  async findByUserId(userId: string): Promise<Order[]> {
    return this.orderRepository.find({ where: { user_id: userId } });
  }

  async findById(id: string): Promise<Order> {
    return this.orderRepository.findOne({ where: { id } });
  }

  async update(id: string, updateData: Partial<Order>): Promise<Order> {
    await this.orderRepository.update(id, updateData);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
