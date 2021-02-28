import { AudioState } from './audio/index';
import { WavesurferService } from '../services/WavesurferService';

export interface StoreInjections {
  wavesurferService: WavesurferService;
}

export interface AppState {
  audio: AudioState;
}
