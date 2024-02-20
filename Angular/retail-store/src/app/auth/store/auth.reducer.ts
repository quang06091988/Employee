import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

import { User } from '../user.model';

export interface State {
  user: User;
  errorMessage: string;
  isLoading: boolean;
}

const initialState: State = {
  user: null,
  errorMessage: null,
  isLoading: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.signupStart, AuthActions.loginStart, (state) => ({
    ...state,
    errorMessage: null,
    isLoading: true,
  })),
  on(
    AuthActions.authenticateSuccess,
    (state, { email, id, token, tokenExpirationDate }) => ({
      ...state,
      user: new User(email, id, token, tokenExpirationDate),
      errorMessage: null,
      isLoading: false,
    })
  ),
  on(AuthActions.authenticateFail, (state, { errorMessage }) => ({
    ...state,
    user: null,
    errorMessage: errorMessage,
    isLoading: false,
  })),
  on(AuthActions.clearError, (state) => ({
    ...state,
    errorMessage: null,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
  }))
);
