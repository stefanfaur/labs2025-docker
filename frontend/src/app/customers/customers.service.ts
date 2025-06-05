import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CustomerModel} from './domain/customer.model';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private customers = signal<CustomerModel[]>([])

  constructor(private httpClient: HttpClient) {
    this.fetchCustomers();
  }

  private fetchCustomers() {
    this.httpClient.get<CustomerModel[]>('http://localhost:3000/api/customers').subscribe(customers => this.customers.set(customers))
  }

  getCustomers() {
    return this.customers
  }

  getById(id: String) {
    return this.httpClient.get<CustomerModel>(`http://localhost:3000/api/customers/${id}`)
  }

  saveOrUpdateCustomer(customer: CustomerModel) {
    return this.httpClient.post<CustomerModel>('http://localhost:3000/api/customers', customer).pipe(tap(_ => this.fetchCustomers()))
  }
}
