import {AfterViewInit, Component, effect, inject, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CustomersService} from '../customers.service';
import {CustomerModel} from '../domain/customer.model';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginator,
    MatButtonModule,
    MatIconModule
  ],
  styleUrl: './customers-list.component.scss'
})
export class CustomersListComponent implements AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  customersService = inject(CustomersService)
  router = inject(Router)
  customers = this.customersService.getCustomers()

  dataSource = new MatTableDataSource<CustomerModel>()
  readonly columns = ['firstName', 'lastName', 'age', 'city', 'country', 'actions'];

  constructor() { // Effect to update table when data changes
    effect(() => {
      this.dataSource.data = this.customers();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  goToDetails(customer: CustomerModel) {
    this.router.navigate(['customers', customer.id])
  }

}
