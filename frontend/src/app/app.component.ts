import { Component, inject } from '@angular/core';
import {FooterComponent} from './footer/footer.component';
import {MenuComponent} from './menu/menu.component';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FooterComponent, MenuComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ex_2_1';
  private router = inject(Router);

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
