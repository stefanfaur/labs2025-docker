import {Component, forwardRef, signal} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-hotness-rating',
  imports: [
    NgForOf
  ],
  templateUrl: './hotness-rating.component.html',
  styleUrl: './hotness-rating.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HotnessRatingComponent),
      multi: true,
    },
  ],
})

export class HotnessRatingComponent implements ControlValueAccessor {
  peppers = Array(5).fill(0);
  hotness = signal(0);

  private onChange = (value: number) => {
  };

  private onTouched = () => {
  };

  writeValue(value: number): void {
    this.hotness.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  onClick(value: number): void {
    this.hotness.set(value);
    this.onChange(value);
    this.onTouched();
  }
}
