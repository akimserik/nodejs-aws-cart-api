import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart, CartStatus } from '../models/cart.entity';
import { CartItem } from '../models/cart-item.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    return this.cartRepository.findOne({
      where: { user_id: userId },
      relations: ['items'],
    });
  }

  async createByUserId(userId: string): Promise<Cart> {
    const userCart = this.cartRepository.create({
      user_id: userId,
      items: [],
      created_at: new Date(),
      updated_at: new Date(),
      status: CartStatus.OPEN,
    });
    return this.cartRepository.save(userCart);
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    let userCart = await this.findByUserId(userId);
    if (!userCart) {
      userCart = await this.createByUserId(userId);
    }
    return userCart;
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const userCart = await this.findOrCreateByUserId(userId);
    userCart.items = items.map((item) => {
      return this.cartItemRepository.create(item);
    });
    userCart.updated_at = new Date();
    return this.cartRepository.save(userCart);
  }

  async removeByUserId(userId: string): Promise<void> {
    const userCart = await this.findByUserId(userId);
    if (userCart) {
      await this.cartRepository.remove(userCart);
    }
  }
}
