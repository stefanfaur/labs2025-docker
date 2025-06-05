import {Component, inject, signal} from '@angular/core';
import {FeaturePizzaListComponent} from '../feature-pizza-list/feature-pizza-list.component';
import {PizzaFormComponent} from '../pizza-form/pizza-form.component';
import {PizzaModel} from '../domain/pizza.model';
import {PizzaService} from '../pizza.service';
import {FeatureHottestPizzaComponent} from '../feature-hottest-pizza/feature-hottest-pizza.component';
import {MessageService} from '../../../lib/message-service';
import {HeaderComponent} from '../../header/header.component';

@Component({
  selector: 'app-pizza-container',
  imports: [
    FeaturePizzaListComponent,
    PizzaFormComponent,
    FeatureHottestPizzaComponent,
    HeaderComponent
  ],
  templateUrl: './pizza-container.component.html',
  styleUrl: './pizza-container.component.scss'
})
export class PizzaContainerComponent {

  constructor(private pizzaService: PizzaService) {
  }

  messageService = inject(MessageService);

  get pizzas() {
    return this.pizzaService.getPizzas()
  }

  pizza = signal<PizzaModel | null>(null);

  onPizzaChanged($event: PizzaModel) {
    this.pizzaService.saveOrUpdatePizza($event)
    this.pizza.set(null);
  }

  addNewPizza() {
    this.pizza.set({
      id: Math.random().toString(),
      imageUrl: '',
      name: '',
      description: '',
      price: 0,
      ingredients: [],
      hotness: 0
    })
  }

  onPizzaSelected($event: PizzaModel) {
    this.pizza.set($event)
  }

  onPizzaDeleted($event: PizzaModel) {
    this.pizzaService.deletePizza($event)
  }
}
