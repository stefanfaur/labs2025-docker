import {Routes} from '@angular/router';
import {FeatureStoreListComponent} from './feature-store-list/feature-store-list.component';
import {FeatureStoreDetailsComponent} from './feature-store-details/feature-store-details.component';

export const storesRoutes: Routes = [
  {
    path: '',
    component: FeatureStoreListComponent
  },
  {
    path: ':id',
    component: FeatureStoreDetailsComponent
  }
];
