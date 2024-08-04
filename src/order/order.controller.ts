import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from './services/order.service';
import { Order } from './models/order.entity';

@Controller('api/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async createOrder(@Body() orderData: Partial<Order>) {
    const order = await this.orderService.create(orderData);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order created successfully',
      data: order,
    };
  }

  @Get('user/:userId')
  async getOrdersByUserId(@Param('userId') userId: string) {
    const orders = await this.orderService.findByUserId(userId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Orders fetched successfully',
      data: orders,
    };
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    const order = await this.orderService.findById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order fetched successfully',
      data: order,
    };
  }

  @Put(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() updateData: Partial<Order>,
  ) {
    const updatedOrder = await this.orderService.update(id, updateData);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order updated successfully',
      data: updatedOrder,
    };
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    await this.orderService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order deleted successfully',
    };
  }
}
