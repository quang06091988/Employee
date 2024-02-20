import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as AuthSelectors from '../auth/store/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authUserSubscription: Subscription;
  isAuthenticated = false;
  email: string;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.authUserSubscription = this.store
      .select(AuthSelectors.authUser)
      .subscribe((authUser) => {
        this.isAuthenticated = !!authUser;
        if (authUser) {
          this.email = authUser.email;
        }
      });
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy(): void {
    if(this.authUserSubscription) {
      this.authUserSubscription.unsubscribe();
    }
  }
}
