import {Routes} from '@angular/router';
import {CustomersListComponent} from './customers-list/customers-list.component';
import {CustomersDetailsComponent} from './customers-details/customers-details.component';

export const customersRoutes: Routes = [
  {
    path: '',
    component: CustomersListComponent
  },
  {
    path: ':id',
    component: CustomersDetailsComponent
  }
];
