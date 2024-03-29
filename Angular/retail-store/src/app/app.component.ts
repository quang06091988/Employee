import { Component, OnInit } from '@angular/core';

import '../../node_modules/bootstrap/dist/js/bootstrap.min';

import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.autoLogin());
  }
}
