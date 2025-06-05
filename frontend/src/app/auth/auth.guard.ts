import {CanActivateFn, Router} from '@angular/router';
import { map } from 'rxjs';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isLoggedIn().pipe(
    map(isLoggedIn => isLoggedIn ? true : router.createUrlTree(['/unauthorized']))
  );
};
