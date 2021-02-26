import { AudioState } from './audio/index';
import { WaveformService } from '../services/WaveformService';

export interface StoreInjections {
  waveformService: WaveformService;
}

export interface AppState {
  audio: AudioState;
}
