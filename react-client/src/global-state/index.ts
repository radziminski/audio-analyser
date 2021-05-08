import { createStore } from 'easy-peasy';
import { IAppState } from './types';
import audioState from './audio';
import authState from './auth';
import userState from './user';

export const storeModel: IAppState = {
  audio: audioState,
  auth: authState,
  user: userState
};

const initStore = () => createStore(storeModel);

export default initStore;
