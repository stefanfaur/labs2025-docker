import {Component, effect, inject, input, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StoresService} from '../stores.service';
import {StoreModel} from '../domain/store.model';
import {StoreDetailsCardComponent} from '../store-details-card/store-details-card.component';

@Component({
  selector: 'app-feature-store-details',
  imports: [
    StoreDetailsCardComponent
  ],
  templateUrl: './feature-store-details.component.html',
  styleUrl: './feature-store-details.component.scss'
})
export class FeatureStoreDetailsComponent {

  route = inject(ActivatedRoute);
  storesService = inject(StoresService);
  id = input.required<string>()
  storeDetails = signal<StoreModel | null>(null);

  constructor() {
    effect(() => {
      const id = this.id()
      if (id) {
        this.storesService.getById(id).subscribe(store => this.storeDetails.set(store))
      } else {
        this.storeDetails.set(null)
      }
    });
  }
}
