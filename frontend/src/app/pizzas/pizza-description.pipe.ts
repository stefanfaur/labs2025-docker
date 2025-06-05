import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pizzaDescription'
})
export class PizzaDescriptionPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace('pineapple', '[REDACTED]');
  }

}
