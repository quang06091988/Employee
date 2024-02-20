import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromProducts from '../products/store/products.reducer';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';

export interface AppState {
  router: RouterReducerState;
  auth: fromAuth.State;
  products: fromProducts.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: fromAuth.authReducer,
  products: fromProducts.authReducer,
};
