import { createStore } from 'easy-peasy';

import audioState from './audio';
import authState from './auth';
import projectState from './project';
import { IAppState } from './types';
import uiState from './ui';
import userState from './user';

export const storeModel: IAppState = {
  audio: audioState,
  auth: authState,
  user: userState,
  project: projectState,
  ui: uiState
};

const initStore = () => createStore(storeModel);

export default initStore;
