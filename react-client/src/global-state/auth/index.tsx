import { Action, Thunk, action, thunk } from 'easy-peasy';
import AuthService, { ILoginCredentials } from 'services/AuthService';

export type AuthAction<Payload = void> = Action<AuthState, Payload>;
export type AuthThunk<Payload = void> = Thunk<AuthState, Payload>;

const TOKEN_STORAGE_KEY = 'token';

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  authError: string | null;

  setIsLoading: AuthAction<boolean>;
  setIsAuthenticated: AuthAction;
  setError: AuthAction<string | null>;
  login: AuthThunk<ILoginCredentials>;
  register: AuthThunk;
  logout: AuthThunk;
}

const authState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  authError: null,

  setIsAuthenticated: action((state) => {
    state.isAuthenticated = true;
  }),

  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),

  setError: action((state, payload) => {
    state.authError = payload;
  }),

  login: thunk(async (actions, payload) => {
    actions.setIsLoading(true);
    actions.setError(null);
    try {
      const token = await AuthService.login(payload);

      localStorage.setItem(TOKEN_STORAGE_KEY, token);
      actions.setIsAuthenticated();
    } catch (error) {
      if (error.response?.status === 401)
        actions.setError('Incorrect password or user does not exist.');
    } finally {
      setTimeout(() => actions.setIsLoading(false), 1000);
    }
  }),

  register: thunk(async (actions, payload) => {
    // TODO
  }),

  logout: thunk(async (actions, payload) => {
    // TODO
  })
};

export default authState;
