import {Component, inject} from '@angular/core';
import {OrderService} from './orders.service';
import {OrderModel} from './domain/order.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [
    DatePipe
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  private orderService = inject(OrderService);
  orders = this.orderService.getOrders();

  getTitle(): string {
    return this.orderService.getOrdersTitle();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'CREATED': return 'badge-secondary';
      case 'IN_PROGRESS': return 'badge-warning';
      case 'COMPLETED': return 'badge-success';
      case 'IN_DELIVERY': return 'badge-info';
      default: return 'badge-secondary';
    }
  }

  getOrderTotal(order: OrderModel): number {
    return order.pizzas.reduce((total, pizza) => total + pizza.price, 0);
  }
}
