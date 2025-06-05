import {Component, input} from '@angular/core';
import {StoreModel} from '../domain/store.model';

@Component({
  selector: 'app-store-details-card',
  imports: [],
  templateUrl: './store-details-card.component.html',
  styleUrl: './store-details-card.component.scss'
})
export class StoreDetailsCardComponent {
  store = input.required<StoreModel>();
}
