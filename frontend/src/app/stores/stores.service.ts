import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StoreModel} from './domain/store.model';
import {Observable, map} from 'rxjs';

interface BackendStore {
  id: number;
  name: string;
  description: string;
  address: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  private stores = signal<StoreModel[]>([])
  private readonly baseUrl = 'http://localhost:8081/stores';

  constructor(private httpClient: HttpClient) {
    this.fetchStores();
  }

  private fetchStores() {
    this.httpClient.get<BackendStore[]>(this.baseUrl).pipe(
      map(stores => stores.map(this.mapToStoreModel))
    ).subscribe(stores => this.stores.set(stores))
  }

  private mapToStoreModel(backendStore: BackendStore): StoreModel {
    return {
      id: backendStore.id.toString(),
      name: backendStore.name,
      description: backendStore.description,
      address: backendStore.address,
      imageUrl: backendStore.imageUrl
    };
  }

  getStores() {
    return this.stores
  }

  getById(id: string): Observable<StoreModel> {
    return this.httpClient.get<BackendStore>(`${this.baseUrl}/${id}`).pipe(
      map(this.mapToStoreModel)
    );
  }
}
