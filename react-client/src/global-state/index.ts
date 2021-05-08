import { createStore } from 'easy-peasy';
import { IAppState } from './types';
import audioState from './audio';
import authState from './auth';
import userState from './user';
import projectState from './project';

export const storeModel: IAppState = {
  audio: audioState,
  auth: authState,
  user: userState,
  project: projectState
};

const initStore = () => createStore(storeModel);

export default initStore;
