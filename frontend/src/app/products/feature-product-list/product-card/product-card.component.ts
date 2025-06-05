import {Component, computed, input} from '@angular/core';
import {PizzaModel} from '../../../pizzas/domain/pizza.model';
import {ProductModel} from '../../domain/product.model';
import {PizzaDescriptionPipe} from '../../../pizzas/pizza-description.pipe';

@Component({
  selector: 'app-product-card',
  imports: [
    PizzaDescriptionPipe
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  product = input.required<ProductModel>();

  imagePlaceholder = {
    pizza : '/pizza_placeholder.png',
    burger : '/burger_placeholder.png',
    pasta: '/pasta_placeholder.png',
  }

  price = computed( () => {
    return `${this.product().price} RON`;
  })

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = this.imagePlaceholder[this.product().type];
  }
}
