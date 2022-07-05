import { IAudioState } from './audio/types';
import { IAuthState } from './auth/types';
import { IProjectState } from './project/types';
import { IUIState } from './ui/types';
import { IUserState } from './user/types';

export interface IAppState {
  audio: IAudioState;
  auth: IAuthState;
  user: IUserState;
  project: IProjectState;
  ui: IUIState;
}
