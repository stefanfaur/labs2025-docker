import {Component, inject} from '@angular/core';
import {StoresService} from '../stores.service';
import {StoreListEntryComponent} from '../store-list-entry/store-list-entry.component';
import {Router} from '@angular/router';
import {StoreModel} from '../domain/store.model';

@Component({
  selector: 'app-feature-store-list',
  imports: [
    StoreListEntryComponent
  ],
  templateUrl: './feature-store-list.component.html',
  styleUrl: './feature-store-list.component.scss'
})
export class FeatureStoreListComponent {
  storeService = inject(StoresService)
  router = inject(Router)
  stores = this.storeService.getStores()

  goToDetails(store: StoreModel) {
    this.router.navigate(['stores', store.id])
  }
}
