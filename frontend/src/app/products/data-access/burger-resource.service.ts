import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductFilter} from '../domain/product-filters.model';
import {buildQueryParams} from '../utils/utils-filter';


@Injectable({
  providedIn: "root"
})
export class BurgerResourceService {

  httpClient = inject(HttpClient);

  getAllBurgers(filters?: ProductFilter) {

    const filtersParams = filters ? buildQueryParams(filters) : '';

    return this.httpClient.get<any[]>('http://localhost:3000/api/filtered_burgers'+ filtersParams);
  }



}
