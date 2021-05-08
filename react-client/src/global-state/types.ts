import { UserState } from './user/types';
import { AuthState } from './auth/types';
import { AudioState } from './audio/index';

export interface AppState {
  audio: AudioState;
  auth: AuthState;
  user: UserState;
}
