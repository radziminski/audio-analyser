import { AuthState } from './types';
import { action, thunk } from 'easy-peasy';

import AuthService from 'services/AuthService';

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

      AuthService.setTokens({ accessToken: token });

      actions.setIsAuthenticated();
      return true;
    } catch (error) {
      if (error.response?.status === 401)
        actions.setError('Incorrect password or user does not exist.');
    } finally {
      setTimeout(() => actions.setIsLoading(false), 1000);
    }

    return false;
  }),

  register: thunk(async (actions, payload) => {
    actions.setIsLoading(true);
    actions.setError(null);
    try {
      await AuthService.register(payload);

      return true;
    } catch (error) {
      error.response?.data?.message &&
        actions.setError(error.response.data.message);
    } finally {
      setTimeout(() => actions.setIsLoading(false), 1000);
    }

    return false;
  }),

  logout: thunk(async (actions, payload) => {
    // TODO
  })
};

export default authState;
