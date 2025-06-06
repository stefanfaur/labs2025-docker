import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrderModel} from './domain/order.model';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders = signal<OrderModel[]>([]);
  private baseUrl = 'http://localhost:8081';

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.fetchOrders();
  }

  private fetchOrders() {
    this.httpClient.get<any[]>(`${this.baseUrl}/orders`).subscribe({
      next: (orders) => {
        const mappedOrders = orders.map(o => this.mapBackendToFrontend(o));
        this.orders.set(mappedOrders);
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        this.orders.set([]);
      }
    });
  }

  private mapBackendToFrontend(backendOrder: any): OrderModel {
    return {
      id: backendOrder.id.toString(),
      customerId: backendOrder.customer.id.toString(),
      customerName: backendOrder.customer.name,
      pizzas: backendOrder.pizzas.map((p: any) => ({
        id: p.id.toString(),
        name: p.name,
        price: p.currencyValue?.price || 0
      })),
      orderDate: backendOrder.orderDate,
      orderStatus: backendOrder.orderStatus
    };
  }

  getOrders() {
    return this.orders;
  }

  getOrdersTitle(): string {
    return this.authService.isAdmin() ? 'All Orders' : 'My Orders';
  }

  createOrder(customerId: string, pizzaIds: string[]) {
    const request = {
      customerId: parseInt(customerId),
      pizzaIds: pizzaIds.map(id => parseInt(id))
    };
    
    return this.httpClient.post(`${this.baseUrl}/orders`, request).subscribe(() => {
      this.fetchOrders();
    });
  }

  /**
   * Create an order for a single pizza using the current user's customer ID
   */
  createOrderForCurrentUser(pizzaId: string) {
    // Map current user to customer ID (same logic as backend)
    const currentUser = this.getCurrentUsername();
    const customerId = this.mapUsernameToCustomerId(currentUser);
    
    if (!customerId) {
      console.error('Cannot create order: User does not have an associated customer ID');
      return;
    }

    const request = {
      customerId: customerId,
      pizzaIds: [parseInt(pizzaId)]
    };
    
    return this.httpClient.post(`${this.baseUrl}/orders`, request).subscribe({
      next: () => {
        console.log('Order created successfully');
        this.fetchOrders();
      },
      error: (error) => {
        console.error('Error creating order:', error);
      }
    });
  }

  private getCurrentUsername(): string | null {
    const token = this.authService.getToken();
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub; // JWT standard: 'sub' contains the username
    } catch (e) {
      return null;
    }
  }

  private mapUsernameToCustomerId(username: string | null): number | null {
    // Same mapping as backend
    switch (username) {
      case 'customer': return 1; // Alice Johnson
      case 'user': return 2;     // Bob Smith  
      default: return null;      // admin and others don't have customer IDs
    }
  }
} 