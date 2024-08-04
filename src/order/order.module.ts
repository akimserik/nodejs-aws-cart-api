import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './services/order.service';
import { OrderController } from './order.controller';
import { Order } from './models/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]), // Register Order entity
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService], // Export OrderService if needed in other modules
})
export class OrderModule {}
