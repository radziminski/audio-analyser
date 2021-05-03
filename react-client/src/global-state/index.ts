import { createStore } from 'easy-peasy';
import WavesurferService from 'services/WavesurferService';
import { StoreInjections, AppState } from './types';
import audioState from './audio';

export const injections: StoreInjections = {
  wavesurferService: WavesurferService
};

export const storeModel: AppState = {
  audio: audioState
};

const initStore = () => createStore(storeModel, { injections });

export default initStore;
