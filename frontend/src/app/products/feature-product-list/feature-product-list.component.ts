import {Component, effect, inject, signal} from '@angular/core';
import {SortComponent, SortConfig} from './sort/sort.component';
import {FiltersComponent} from './filters/filters.component';
import {ProductFilter} from '../domain/product-filters.model';
import {SortOption} from '../domain/product-sort.model';
import {ProductCardComponent} from './product-card/product-card.component';
import {featureProductListStore} from './+store/feature-product-list.store';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-feature-product-list',
  imports: [
    SortComponent,
    FiltersComponent,
    ProductCardComponent,
  ],
  templateUrl: './feature-product-list.component.html',
  styleUrl: './feature-product-list.component.scss',
  providers:[featureProductListStore]

})
export class FeatureProductListComponent {
  sortFields = signal<SortOption[]>([
    {
      value: 'name',
      label: 'Name'
    },
    {
      value: 'price',
      label: 'Price'
    },
    {
      value: 'rating',
      label: 'Rating'
    }
  ]);

  store = inject(featureProductListStore);


  products = this.store.products;

  onSortChange(sortConfig: SortConfig) {
    this.store.updateSort(sortConfig)
  }

  onFilterChanged(event: ProductFilter) {

    this.store.updateFilters(event);
  }

  loadRating() {
    this.store.loadRatings();
  }
}
