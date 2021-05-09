import { IUIState } from './ui/types';
import { IUserState } from './user/types';
import { IAuthState } from './auth/types';
import { IAudioState } from './audio/types';
import { IProjectState } from './project/types';

export interface IAppState {
  audio: IAudioState;
  auth: IAuthState;
  user: IUserState;
  project: IProjectState;
  ui: IUIState;
}
