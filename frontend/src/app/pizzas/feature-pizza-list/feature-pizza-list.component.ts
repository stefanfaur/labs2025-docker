import {Component, inject, input, output} from '@angular/core';
import {PizzaModel} from '../domain/pizza.model';
import {PizzaCardComponent} from '../pizza-card/pizza-card.component';
import {DeleteRedDirective} from '../../common/delete-red.directive';
import {IfPermissionDirective} from '../../common/if-permission.directive';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-feature-pizza-list',
  imports: [
    PizzaCardComponent,
    DeleteRedDirective,
    IfPermissionDirective,
  ],
  templateUrl: './feature-pizza-list.component.html',
  styleUrl: './feature-pizza-list.component.scss'
})
export class FeaturePizzaListComponent {
  pizzas = input<PizzaModel[]>([]);
  pizzaSelected = output<PizzaModel>();
  pizzaDeleted = output<PizzaModel>();
  pizzaOrdered = output<PizzaModel>();
  authService = inject(AuthService)

  editClicked(pizza: PizzaModel) {
    this.pizzaSelected.emit(pizza);
  }

  deleteClicked(pizza: PizzaModel) {
    this.pizzaDeleted.emit(pizza);
  }

  orderPizza(pizza: PizzaModel) {
    this.pizzaOrdered.emit(pizza);
  }
}
