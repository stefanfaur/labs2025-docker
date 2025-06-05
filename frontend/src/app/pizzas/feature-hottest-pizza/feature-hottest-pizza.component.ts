import {Component, computed, input} from '@angular/core';
import {PizzaModel} from '../domain/pizza.model';

@Component({
  selector: 'app-feature-hottest-pizza',
  imports: [],
  templateUrl: './feature-hottest-pizza.component.html',
  styleUrl: './feature-hottest-pizza.component.scss'
})
export class FeatureHottestPizzaComponent {
  pizzas = input<PizzaModel[]>([]);

  hottestPizza = computed(() => {
    return this.pizzas().sort((a, b) => b.hotness - a.hotness)
      .slice(0, 3)
      .map(pizza => {
        return {
          id: pizza.id,
          name: pizza.name,
          hotness: pizza.hotness,
          imageUrl: pizza.imageUrl,
        }
      })
  })
}
