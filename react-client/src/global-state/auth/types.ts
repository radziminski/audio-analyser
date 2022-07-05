import { Action, Thunk } from 'easy-peasy';

export type AuthAction<Payload = void> = Action<IAuthState, Payload>;

export type AuthThunk<Payload = void, Result = void> = Thunk<
  IAuthState,
  Payload,
  Result
>;

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegisterCredentials {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface IAuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  authError: string | null;

  setIsLoading: AuthAction<boolean>;
  setIsAuthenticated: AuthAction<boolean>;
  setError: AuthAction<string | null>;
  login: AuthThunk<ILoginCredentials, boolean>;
  register: AuthThunk<IRegisterCredentials, boolean>;
  logout: AuthAction;
}
