import { action, thunk, Action, Thunk, computed, Computed } from 'easy-peasy';
import AudioService from './audioController';

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
    sample3: require('assets/sample3.wav'),
    volumes: require('assets/volumes.wav'),
    max: require('assets/max.wav'),
    three: require('assets/three_over.wav'),
    change: require('assets/change.wav'),
    noise: require('assets/noise.wav'),
    freqs: require('assets/freqs.wav')
  },

  loadAudioBuffer: thunk(async (actions, _) => {
    actions.setIsLoadingAudioBuffer(true);
    await AudioService.loadBuffer();
    actions.setIsLoadingAudioBuffer(false);
  }),

  setIsLoadingAudioBuffer: action((state, payload) => {
    state.isLoadingAudioBuffer = payload;
    if (payload) state.didLoadAudioBuffer = true;
  }),

  currTime: computed(() => AudioService.audioElement?.currentTime || 0),
  duration: computed(() => AudioService.audioElement?.duration || 0),

  setCurrTime: action((_, time) => {
    AudioService.setTime(time);
  }),

  play: action((state) => {
    AudioService.play();
    state.isPlaying = true;
  }),

  stop: action((state) => {
    AudioService.stop();
    state.isPlaying = false;
  }),

  pause: action((state) => {
    AudioService.pause();
    state.isPlaying = false;
  }),

  setCurrSrc: action((state, src) => {
    state.currSrc = src;
  }),

  loadAudio: action((state, src) => {
    AudioService.stop();
    state.isPlaying = false;
    AudioService.reloadAudio(src);

    state.currSrc = src;
  })
};

export default audioState;
