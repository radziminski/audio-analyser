import { UserState } from './types';
import UserService from './../../services/UserService';
import { action, thunk } from 'easy-peasy';

const userState: UserState = {
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

      actions.setIsLoading(false);
      actions.setUser(user);
    } catch (error) {
      actions.setIsLoading(false);
      throw error;
    }
  })
};

export default userState;
