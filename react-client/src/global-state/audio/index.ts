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
  currSource: string | null;
  audioSources: Record<string, string>;

  setIsLoadingAudioBuffer: AudioAction<boolean>;
  loadAudioBuffer: AudioThunk;
  play: AudioAction;
  pause: AudioAction;
  stop: AudioAction;
  setCurrTime: AudioAction<number>;
  setCurrSource: AudioAction<string | null>;
  loadAudio: AudioAction<string>;
  addAudioSources: AudioAction<Record<string, string>>;
}

const audioState: AudioState = {
  isPlaying: false,
  isLoadingAudioBuffer: false,
  didLoadAudioBuffer: false,
  currSource: null,
  audioSources: {
    song: require('assets/song.mp3'),
    guitar: require('assets/guitar.wav'),
    volumes: require('assets/volumes.wav'),
    max: require('assets/max.wav'),
    change: require('assets/change.wav'),
    noise: require('assets/noise.wav'),
    freqs: require('assets/freqs.wav'),
    mp3: require('assets/sampleMp3.mp3'),
    mp3Long: require('assets/sampleLong.mp3')
  },

  loadAudioBuffer: thunk(async (actions) => {
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
    AudioService.context.resume();
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

  setCurrSource: action((state, src) => {
    state.currSource = src;
  }),

  loadAudio: action((state, src) => {
    AudioService.stop();
    state.isPlaying = false;
    AudioService.reloadAudio(src);

    state.currSource = src;
  }),

  addAudioSources: action((state, sources) => {
    state.audioSources = {
      ...state.audioSources,
      ...sources
    };
  })
};

export default audioState;
