import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StoreModel} from './domain/store.model';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  private stores = signal<StoreModel[]>([])

  constructor(private httpClient: HttpClient) {
    this.fetchStores();
  }

  private fetchStores() {
    this.httpClient.get<StoreModel[]>('http://localhost:3000/api/stores').subscribe(stores => this.stores.set(stores))
  }

  getStores() {
    return this.stores
  }

  getById(id: String) {
    return this.httpClient.get<StoreModel>(`http://localhost:3000/api/stores/${id}`)
  }
}
