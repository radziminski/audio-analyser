import { IAuthState } from './types';
import { action, thunk } from 'easy-peasy';

import AuthService from 'services/AuthService';

const authState: IAuthState = {
  isLoading: false,
  isAuthenticated: false,
  authError: null,

  setIsAuthenticated: action((state, payload) => {
    state.isAuthenticated = payload;
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
      await AuthService.login({ ...payload });

      actions.setIsAuthenticated(true);
      return true;
    } catch (error) {
      if (error.response?.status === 401)
        actions.setError('Incorrect password or user does not exist.');
      else
        actions.setError(
          'There was a problem with accessing the server. Try again later.'
        );
    } finally {
      actions.setIsLoading(false);
    }

    return false;
  }),

  register: thunk(async (actions, payload) => {
    actions.setIsLoading(true);
    actions.setError(null);
    try {
      await AuthService.register({
        email: payload.email,
        password: payload.password,
        first_name: payload.firstName,
        last_name: payload.lastName
      });

      actions.setIsAuthenticated(true);
      return true;
    } catch (error) {
      if (error.response?.status === 400)
        error.response?.data?.message &&
          actions.setError(
            Array.isArray(error.response.data.message)
              ? error.response.data.message[0]
              : error.response.data.message
          );
      else
        actions.setError(
          'There was a problem with accessing the server. Try again later.'
        );
    } finally {
      actions.setIsLoading(false);
    }

    return false;
  }),

  logout: action((state) => {
    state.isLoading = false;
    state.isAuthenticated = false;
    state.authError = null;

    AuthService.logout();
  })
};

export default authState;
