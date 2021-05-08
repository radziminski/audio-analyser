import { Thunk, Action } from 'easy-peasy';
import {
  ILoginCredentials,
  IRegisterCredentials
} from './../../services/AuthService';

export type AuthAction<Payload = void> = Action<IAuthState, Payload>;

export type AuthThunk<Payload = void, Result = void> = Thunk<
  IAuthState,
  Payload,
  Result
>;

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
