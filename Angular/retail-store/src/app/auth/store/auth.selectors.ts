import { createSelector } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as fromAuth from './auth.reducer';

export const auth = (appState: fromApp.AppState) => appState.auth;

export const authUser = createSelector(
  auth,
  (authState: fromAuth.State) => authState.user
);
