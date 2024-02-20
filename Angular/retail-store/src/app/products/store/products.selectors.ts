import { createSelector } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as fromProducts from './products.reducer';

export const state = (appState: fromApp.AppState) => appState.products;

export const products = createSelector(
  state,
  (state: fromProducts.State) => state.products
);
