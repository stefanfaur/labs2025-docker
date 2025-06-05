import {inject, Injectable} from '@angular/core';
import {PizzaModel} from '../../pizzas/domain/pizza.model';
import {HttpClient} from '@angular/common/http';
import {ProductFilter} from '../domain/product-filters.model';
import {buildQueryParams} from '../utils/utils-filter';


@Injectable({
  providedIn: 'root'
})
export class PizzaResourceService {

  httpClient = inject(HttpClient);


   getAllPizzas(filters? : ProductFilter) {
    const filtersParams = filters ? buildQueryParams(filters) : '';

    return this.httpClient.get<PizzaModel[]>('http://localhost:3000/api/filtered_pizza' + filtersParams)
  }

}
