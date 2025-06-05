import {Component, computed, input} from '@angular/core';
import {PizzaModel} from '../domain/pizza.model';
import {PizzaDescriptionPipe} from '../pizza-description.pipe';

@Component({
  selector: 'app-pizza-card',
  imports: [
    PizzaDescriptionPipe
  ],
  templateUrl: './pizza-card.component.html',
  styleUrl: './pizza-card.component.scss'
})
export class PizzaCardComponent {
  pizza = input.required<PizzaModel>();

  price = computed( () => {
    return `${this.pizza().price} RON`;
  })
}
