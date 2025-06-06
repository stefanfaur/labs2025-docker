import {Routes} from '@angular/router';
import {authGuard} from './auth/auth.guard';
import {adminGuard} from './auth/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'pizzas',
    loadComponent: () => import('./pizzas/pizza-container/pizza-container.component').then(m => m.PizzaContainerComponent),
    canActivate: [authGuard]
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
    canActivate: [adminGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('./products/api/products-routes').then(m => m.productRoutes),
    canActivate: [authGuard]
  },
  {
    path: 'orders',
    loadComponent: () => import('./orders/orders.component').then(m => m.OrdersComponent),
    canActivate: [authGuard]
  }
];
