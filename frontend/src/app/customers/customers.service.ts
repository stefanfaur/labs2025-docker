import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CustomerModel} from './domain/customer.model';
import {tap, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private customers = signal<CustomerModel[]>([]);
  private baseUrl = 'http://localhost:8081';

  constructor(private httpClient: HttpClient) {
    this.fetchCustomers();
  }

  private fetchCustomers() {
    this.httpClient.get<any[]>(`${this.baseUrl}/customers`).subscribe(customers => {
      const mappedCustomers = customers.map(c => this.mapBackendToFrontend(c));
      this.customers.set(mappedCustomers);
    });
  }

  private mapBackendToFrontend(backendCustomer: any): CustomerModel {
    const nameParts = backendCustomer.name.split(' ');
    return {
      id: backendCustomer.id.toString(),
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      age: '30',
      city: backendCustomer.address || '',
      country: 'Romania'
    };
  }

  private mapFrontendToBackend(frontendCustomer: CustomerModel): any {
    return {
      id: frontendCustomer.id ? parseInt(frontendCustomer.id) : null,
      name: `${frontendCustomer.firstName} ${frontendCustomer.lastName}`,
      address: frontendCustomer.city
    };
  }

  getCustomers() {
    return this.customers;
  }

  getById(id: string) {
    return this.httpClient.get<any>(`${this.baseUrl}/customers/${id}`).pipe(
      map(customer => this.mapBackendToFrontend(customer))
    );
  }

  saveOrUpdateCustomer(customer: CustomerModel) {
    const backendCustomer = this.mapFrontendToBackend(customer);
    return this.httpClient.post<any>(`${this.baseUrl}/customers`, backendCustomer).pipe(
      map(c => this.mapBackendToFrontend(c)),
      tap(() => this.fetchCustomers())
    );
  }
}
