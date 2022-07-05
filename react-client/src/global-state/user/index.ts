import { action, thunk } from 'easy-peasy';

import UserService from './../../services/UserService';
import { IUserState } from './types';

const userState: IUserState = {
  user: null,
  isLoading: false,

  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),

  setUser: action((state, payload) => {
    state.user = payload;
  }),

  clear: action((state) => {
    state.user = null;
    state.isLoading = false;
  }),

  fetchUser: thunk(async (actions) => {
    actions.setIsLoading(true);

    try {
      const userDto = await UserService.fetchMe();

      const user = {
        id: userDto.id,
        profileId: userDto.profile?.id,
        email: userDto.email,
        firstName: userDto.profile?.firstName,
        lastName: userDto.profile?.lastName,
        roles: userDto.roles
      };

      actions.setUser(user);

      return user;
      // eslint-disable-next-line no-useless-catch
    } catch (error) {
      throw error;
    } finally {
      actions.setIsLoading(false);
    }
  })
};

export default userState;
