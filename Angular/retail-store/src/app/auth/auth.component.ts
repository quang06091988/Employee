import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import * as AuthSelectors from './store/auth.selectors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  signUpMode: boolean = false;
  authForm: FormGroup;

  isLoading: boolean = false;
  errorMessage: string;
  isError: boolean = false;

  private authSubscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.initForm();

    this.authSubscription = this.store
      .select(AuthSelectors.auth)
      .subscribe((auth) => {
        this.isLoading = auth.isLoading;
        this.errorMessage = auth.errorMessage;
        if (this.errorMessage) {
          this.isError = true;
        } else {
          this.isError = false;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onSwitchMode() {
    this.signUpMode = !this.signUpMode;
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    if (this.signUpMode) {
      this.store.dispatch(AuthActions.signupStart({ email, password }));
    } else {
      this.store.dispatch(AuthActions.loginStart({ email, password }));
    }
    
    this.authForm.reset();
  }

  onCloseAlert() {
    this.store.dispatch(AuthActions.clearError());
  }

  private initForm() {
    this.authForm = new FormGroup({
      email: new FormControl('admin@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('123456', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
}
