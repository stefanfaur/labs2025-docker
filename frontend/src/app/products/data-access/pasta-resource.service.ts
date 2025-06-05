import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductFilter} from '../domain/product-filters.model';
import {buildQueryParams} from '../utils/utils-filter';


@Injectable({
  providedIn: "root"
})
export class PastaResourceService {

  httpClient = inject(HttpClient);

  getAllPastas(filter?: ProductFilter) {
    const filtersParams = filter ? buildQueryParams(filter) : '';

    return this.httpClient.get<any[]>('http://localhost:3000/api/filtered_pastas' + filtersParams);
  }




}
