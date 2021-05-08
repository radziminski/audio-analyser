import { IUserState } from './user/types';
import { IAuthState } from './auth/types';
import { IAudioState } from './audio/types';

export interface IAppState {
  audio: IAudioState;
  auth: IAuthState;
  user: IUserState;
}
