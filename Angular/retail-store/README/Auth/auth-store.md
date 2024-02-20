Auth Store
********************************************************* Auth State
* interface
{
  user: User;
  errorMessage: string;
  isLoading: boolean;
}
* initial
{
  user: null,
  errorMessage: null,
  isLoading: false,
}

********************************************************* Auth Actions
* Action signupStart({email, password}): called at auth.component.ts
* Action loginStart({email, password}): called at auth.component.ts
- in reducer: set state to {errorMessage: null, isLoading: true}
- in effect: send http post request to backend
  if success:
    set timer to call action logout()
    set user's data to local storage
    call action authenticateSuccess({isRedirect: true})
  if failed:
    call action authenticateFail({})

* Action autoLogin(): called at app.component.ts
- in effect:
    get user's data from local storage
    set timer to call action logout()
    call action authenticateSuccess({isRedirect: false})

* Action authenticateSuccess({email, id, token, tokenExpirationDate, isRedirect})
- in reducer: set state to {user: new User(email, userId, token, expirationDate), errorMessage: null, isLoading: false}
- in effect: check {isRedirect === true} will navigate to '/'

* Action logout(): called at header.component.ts
- in reducer: set state to {user: null}
- in effect:
    delete timer to not call action logout()
    delete user's data from local storage
    navigate to '/auth'

* Action authenticateFail({errorMessage})
- in reducer: set state to {user: null, errorMessage: errorMessage, isLoading: false}

* Action clearError()
- in reducer: set state to {errorMessage: null}

********************************************************* Auth Selectors
* auth => get {user, errorMessage, isLoading}: used at auth.component.ts
* authUser => get {user}: used at auth.guard.ts, auth.interceptor.ts, header.component.ts