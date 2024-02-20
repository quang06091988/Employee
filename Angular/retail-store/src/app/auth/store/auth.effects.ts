import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import * as AuthActions from './auth.actions';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

interface UserLocalStorage {
  email: string;
  id: string;
  token: string;
  tokenExpirationDate: string;
}

@Injectable()
export class AuthEffects {
  private handleAuthentication = (authResponse: AuthResponse) => {
    const email = authResponse.email;
    const id = authResponse.localId;
    const token = authResponse.idToken;
    const tokenExpirationDate = new Date(
      new Date().getTime() + +authResponse.expiresIn * 1000
    );
    const user = new User(email, id, token, tokenExpirationDate);

    localStorage.setItem('userLocalStorage', JSON.stringify(user));

    return AuthActions.authenticateSuccess({
      email: email,
      id: id,
      token: token,
      tokenExpirationDate: tokenExpirationDate,
      isRedirect: true,
    });
  };

  private handleError = (errorRes: HttpErrorResponse) => {
    let errorMessage = 'Đã xảy ra lỗi không xác định!';
    if (!errorRes.error || !errorRes.error.error) {
      return of(AuthActions.authenticateFail({ errorMessage: errorMessage }));
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email đã tồn tại.';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Thông tin đăng nhập không hợp lệ.';
        break;
    }
    return of(AuthActions.authenticateFail({ errorMessage: errorMessage }));
  };

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  signupStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupStart),
      switchMap(({ email, password }) => {
        const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseWebApiKey}`;
        const signUpBody = {
          email: email,
          password: password,
          returnSecureToken: true,
        };
        return this.http.post<AuthResponse>(signUpUrl, signUpBody).pipe(
          tap((authResponse) => {
            const expirationDuration = +authResponse.expiresIn * 1000;
            this.authService.setLogoutTimer(expirationDuration);
          }),
          map((authResponse) => {
            return this.handleAuthentication(authResponse);
          }),
          catchError((errorRes) => {
            return this.handleError(errorRes);
          })
        );
      })
    )
  );

  loginStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStart),
      switchMap(({ email, password }) => {
        const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseWebApiKey}`;
        const loginBody = {
          email: email,
          password: password,
          returnSecureToken: true,
        };
        return this.http.post<AuthResponse>(loginUrl, loginBody).pipe(
          tap((authResponse) => {
            const expirationDuration = +authResponse.expiresIn * 1000;
            this.authService.setLogoutTimer(expirationDuration);
          }),
          map((authResponse) => {
            return this.handleAuthentication(authResponse);
          }),
          catchError((errorRes) => {
            return this.handleError(errorRes);
          })
        );
      })
    )
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      map(() => {
        const userLocalStorage: UserLocalStorage = JSON.parse(
          localStorage.getItem('userLocalStorage')
        );
        if (!userLocalStorage) {
          return { type: 'DUMMY' };
        }
        const user = new User(
          userLocalStorage.email,
          userLocalStorage.id,
          userLocalStorage.token,
          new Date(userLocalStorage.tokenExpirationDate)
        );
        
        if (user.checkToken()) {
          const expirationDuration =
            user.tokenExpirationDate.getTime() -
            new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);

          return AuthActions.authenticateSuccess({
            email: user.email,
            id: user.id,
            token: user.token,
            tokenExpirationDate: user.tokenExpirationDate,
            isRedirect: false,
          });
        }

        return { type: 'DUMMY' };
      })
    )
  );

  authenticateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authenticateSuccess),
        tap(({ isRedirect }) => {
          if (isRedirect) {
            this.router.navigate(['/']);
          }
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userLocalStorage');
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );
}
