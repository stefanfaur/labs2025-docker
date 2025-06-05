import {Component, model} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {ProductFilter} from '../../domain/product-filters.model';

@Component({
  selector: 'app-filters',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  filters = model<ProductFilter>({
    name: {
      value: null,
      matchMode: 'like'
    },
    price: {
      value: null,
      matchMode: 'equal'
    },
    description: {
      value: null,
      matchMode: 'like'
    }
  })

  onNameChanged($event: any) {
    this.filters.update(filters => {
      return {
        ...filters,
        name: {
          value: $event,
          matchMode: 'like'
        }
      }
    })
  }

  onDescriptionChanged($event: any) {
    this.filters.update(filters => {
      return {
        ...filters,
        description: {
          value: $event,
          matchMode: 'like'
        }
      }
    })
  }

  onPriceChanged($event: any) {
    this.filters.update(filters => {
      return {
        ...filters,
        price: {
          value: $event,
          matchMode: 'equal'
        }
      }
    })
  }
}
