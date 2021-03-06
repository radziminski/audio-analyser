import { action, thunk, Action, Thunk, computed, Computed } from 'easy-peasy';
import audioService, { AudioService } from './audioController';

export type AudioAction<Payload = void> = Action<AudioState, Payload>;
export type AudioThunk<Payload = void> = Thunk<AudioState, Payload>;
export type AudioComputed<Result = void> = Computed<AudioState, Result>;

export interface AudioState {
  currTime: AudioComputed<number>;
  duration: AudioComputed<number>;
  isPlaying: boolean;
  isLoadingAudioBuffer: boolean;
  didLoadAudioBuffer: boolean;
  currSrc: string | null;
  audioSources: Record<string, string>;

  setIsLoadingAudioBuffer: AudioAction<boolean>;
  loadAudioBuffer: AudioThunk;
  play: AudioAction;
  pause: AudioAction;
  stop: AudioAction;
  setCurrTime: AudioAction<number>;
  setCurrSrc: AudioAction<string | null>;
  loadAudio: AudioAction<string>;
}

const audioState: AudioState = {
  isPlaying: false,
  isLoadingAudioBuffer: false,
  didLoadAudioBuffer: false,
  currSrc: null,
  audioSources: {
    sampleLong: require('assets/sampleLong.mp3'),
    sample: require('assets/sample.wav'),
    sample2: require('assets/sample2.wav'),
    sample3: require('assets/sample3.wav')
  },

  loadAudioBuffer: thunk(async (actions, _, helpers) => {
    actions.setIsLoadingAudioBuffer(true);
    await audioService.loadBuffer();
    actions.setIsLoadingAudioBuffer(false);
  }),

  setIsLoadingAudioBuffer: action((state, payload) => {
    state.isLoadingAudioBuffer = payload;
    if (payload) state.didLoadAudioBuffer = true;
  }),

  currTime: computed((state) => audioService.audioElement?.currentTime || 0),
  duration: computed((state) => audioService.audioElement?.duration || 0),

  setCurrTime: action((state, time) => {
    audioService.setTime(time);
  }),

  play: action((state) => {
    audioService.play();
    state.isPlaying = true;
  }),

  stop: action((state) => {
    audioService.stop();
    state.isPlaying = false;
  }),

  pause: action((state) => {
    audioService.pause();
    state.isPlaying = false;
  }),

  setCurrSrc: action((state, src) => {
    state.currSrc = src;
  }),

  loadAudio: action((state, src) => {
    audioService.reloadAudio(src);

    state.currSrc = src;
  })
};

export default audioState;
