import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {NgStyle} from '@angular/common';
import {HeaderModel} from './domain/header.model';

@Component({
  selector: 'app-header',
  imports: [
    NgStyle
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  header1 = signal<HeaderModel>({
    title: "Awesome Pizza",
    description: "Experience the irresistible flavor of Awesome Pizza! Our expertly crafted dough is hand-tossed to perfection and topped with the finest ingredients—rich tomato sauce, melted cheese, and a carefully selected mix of savory toppings. ",
    imageUrl: 'bg1.png'
  });

  header2= signal<HeaderModel>({
    title: "Firecracker Pizza",
    description: "Turn up the heat with Firecracker Pizza! This bold creation combines spicy pepperoni, jalapeños, red chili flakes, and a zesty sauce on our signature crispy crust. It's the perfect choice for those who like their pizza with a kick.",
    imageUrl: 'bg2.png'
  });

  header3 = signal<HeaderModel>({
    title: "Garden Delight Pizza",
    description: "Fresh from the oven and the earth, Garden Delight Pizza is a vegetarian masterpiece. Piled high with roasted bell peppers, mushrooms, red onions, olives, and fresh basil, it's a colorful and flavorful feast on our golden, hand-tossed dough.",
    imageUrl: 'bg3.png'
  });

  index = signal(0);

  setIndex(cIndex: number) {
    this.index.set(cIndex);
  }
}
