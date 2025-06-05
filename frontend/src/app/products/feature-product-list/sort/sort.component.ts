import {Component, input, output, signal} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatIconButton} from '@angular/material/button';
import {NgForOf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {SortOption} from '../../domain/product-sort.model';



export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: string;
  direction: SortDirection;
}

@Component({
  selector: 'app-sort',
  imports: [
    MatFormField,
    MatSelect,
    MatLabel,
    MatOption,
    MatIconButton,
    MatIcon,
    NgForOf
  ],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.scss'
})
export class SortComponent {
  fields = input.required<SortOption[]>();

  sortChange = output<SortConfig>();

  sortConfig = signal<SortConfig>({
    field: '',
    direction: 'asc',
  });

  sortFieldChange(value: any) {
    this.sortConfig.update(config => {
      return {
        ...config,
        field: value
      }
    })

    this.sortChange.emit(this.sortConfig());
  }

  sortDirectionChange() {
    this.sortConfig.update(config => {
      return {
        field: config.field || this.fields()[0].value,
        direction: config.direction === 'asc' ? 'desc' : 'asc'
      }
    })
    this.sortChange.emit(this.sortConfig());
  }
}
