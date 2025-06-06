export interface OrderModel {
  id: string;
  customerId: string;
  customerName: string;
  pizzas: OrderPizzaModel[];
  orderDate: string;
  orderStatus: 'CREATED' | 'IN_PROGRESS' | 'COMPLETED' | 'IN_DELIVERY';
}

export interface OrderPizzaModel {
  id: string;
  name: string;
  price: number;
} 