import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthSelectors from './store/auth.selectors';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const router = inject(Router);
  const store = inject(Store<fromApp.AppState>);
  
  return store.select(AuthSelectors.authUser).pipe(
    take(1),
    map((authUser) => {
      const isAuth = !!authUser;
      if (isAuth) {
        return true;
      }
      return router.createUrlTree(['/auth']);
    })
  );
};
