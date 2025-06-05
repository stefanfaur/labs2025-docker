import {Component, model, output} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {PizzaModel} from '../domain/pizza.model';
import {IngredientsValidatorDirective} from '../validators/ingredients-validator.directive';
import {HotnessRatingComponent} from '../hotness-rating/hotness-rating.component';
import {AutoFocusDirective} from '../../common/auto-focus.directive';

@Component({
  selector: 'app-pizza-form',
  imports: [
    FormsModule,
    IngredientsValidatorDirective,
    HotnessRatingComponent,
    AutoFocusDirective
  ],
  templateUrl: './pizza-form.component.html',
  styleUrl: './pizza-form.component.scss'
})
export class PizzaFormComponent {

  pizzaChanged = output<PizzaModel>();
  pizza = model.required<PizzaModel>()

  get ingredients() {
    return this.pizza().ingredients.join(' ');
  }

  onSubmit(pizzaForm: NgForm) {
    if(pizzaForm.valid) {
      this.pizzaChanged.emit(this.pizza());
    }
  }

  nameChanged($event: string ) {
    this.pizza.update(pizza => {
      return {
        ...pizza,
        name: $event
      }
    })
  }

  descriptionChanged($event: string) {
    this.pizza.update(pizza => {
      return {
        ...pizza,
        description: $event
      }
    })

  }

  priceChanged($event: number) {
    this.pizza.update(pizzaData  => {
      return {
        ...pizzaData,
        price: $event
      }
    })
  }

  ingredientsChanged($event: string) {
    this.pizza.update(pizza => {
      return {
        ...pizza,
        ingredients: $event.split(" ")
      }
    })
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file: File = input.files[0];
      this.pizza.update(pizza => {
        return {
          ...pizza,
          imageUrl: URL.createObjectURL(file)
        }
      })
    }
  }

  hotnessChanged(hotness: number) {
    this.pizza.update(pizza => {
      return {
        ...pizza,
        hotness: hotness
      }
    })
  }
}
