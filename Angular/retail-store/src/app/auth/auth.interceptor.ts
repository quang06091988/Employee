import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { exhaustMap, take, map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthSelectors from './store/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.store.select(AuthSelectors.authUser).pipe(
      take(1),
      exhaustMap((authUser) => {
        if (!authUser) {
          return next.handle(request);
        }
        const modifiedReq = request.clone({
          params: new HttpParams().set('auth', authUser.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
