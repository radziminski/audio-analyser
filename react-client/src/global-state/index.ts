import { createStore } from 'easy-peasy';
import { WaveformService } from 'services';
import { StoreInjections, AppState } from './types';
import audioState from './audio';

export const injections: StoreInjections = {
  waveformService: WaveformService
};

export const storeModel: AppState = {
  audio: audioState
};

const initStore = () => createStore(storeModel, { injections });

export default initStore;
