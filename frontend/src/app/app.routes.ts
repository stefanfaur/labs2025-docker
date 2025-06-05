import {Routes} from '@angular/router';
import {authGuard} from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pizzas',
    pathMatch: 'full'
  },
  {
    path: 'pizzas',
    loadComponent: () => import('./pizzas/pizza-container/pizza-container.component').then(m => m.PizzaContainerComponent)
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./auth/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  },
  {
    path: 'stores',
    loadChildren: () => import('./stores/stores.routes').then(m => m.storesRoutes),
    canActivate: [authGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.routes').then(m => m.customersRoutes),
  },
  {
    path: 'products',
    loadChildren: () => import('./products/api/products-routes').then(m => m.productRoutes),

  }
];
