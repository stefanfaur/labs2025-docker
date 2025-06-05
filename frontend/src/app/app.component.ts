import { Component } from '@angular/core';
import {FooterComponent} from './footer/footer.component';
import {MenuComponent} from './menu/menu.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FooterComponent, MenuComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ex_2_1';
}
