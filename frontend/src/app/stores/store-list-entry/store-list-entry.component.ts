import {Component, input} from '@angular/core';
import {StoreModel} from '../domain/store.model';

@Component({
  selector: 'app-store-list-entry',
  imports: [],
  templateUrl: './store-list-entry.component.html',
  styleUrl: './store-list-entry.component.scss'
})
export class StoreListEntryComponent {
  store = input.required<StoreModel>();
}
