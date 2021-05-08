import { Thunk, Action } from 'easy-peasy';
import {
  ILoginCredentials,
  IRegisterCredentials
} from './../../services/AuthService';

export type AuthAction<Payload = void> = Action<AuthState, Payload>;

export type AuthThunk<Payload = void, Result = void> = Thunk<
  AuthState,
  Payload,
  Result
>;

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  authError: string | null;

  setIsLoading: AuthAction<boolean>;
  setIsAuthenticated: AuthAction;
  setError: AuthAction<string | null>;
  login: AuthThunk<ILoginCredentials, boolean>;
  register: AuthThunk<IRegisterCredentials, boolean>;
  logout: AuthThunk;
}
