import {Component, effect, inject, input, signal} from '@angular/core';
import {CustomersService} from '../customers.service';
import {CustomerModel} from '../domain/customer.model';
import {FormsModule} from '@angular/forms';
import {CustomerEditComponent} from '../customer-edit/customer-edit.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customers-details',
  imports: [
    FormsModule,
    CustomerEditComponent
  ],
  templateUrl: './customers-details.component.html',
  styleUrl: './customers-details.component.scss'
})
export class CustomersDetailsComponent {
  customersService = inject(CustomersService);
  router = inject(Router);
  id = input.required<string>()
  customerDetails = signal<CustomerModel | null>(null);

  constructor() {
    effect(() => {
      const id = this.id()
      if (id) {
        this.customersService.getById(id).subscribe(customer => this.customerDetails.set(customer))
      } else {
        this.customerDetails.set(null)
      }
    });
  }

  onCustomerChanged($event: CustomerModel) {
    this.customersService.saveOrUpdateCustomer($event).subscribe({
      next: (customer) => {
        this.customerDetails.set(customer);
        this.router.navigate(['customers']);
      },
      error: (error) => {
        console.error('Error saving customer:', error);
      }
    });
  }

  goBack(){
    this.router.navigate(['customers'])
  }

}
