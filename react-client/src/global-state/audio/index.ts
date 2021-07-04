import { IAudioState, CustomSource } from './types';
import { action, thunk, computed } from 'easy-peasy';
import AudioService from '../../services/AudioService';

const audioState: IAudioState = {
  isPlaying: false,
  isLoadingAudioBuffer: false,
  didLoadAudioBuffer: false,
  currSource: null,
  prevSource: null,
  audioSources: {},

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
    if (src !== state.currSource) {
      state.prevSource = state.currSource;
      state.currSource = src;
      state.didLoadAudioBuffer = false;
    }
  }),

  loadAudio: action((state, src) => {
    AudioService.stop();
    state.isPlaying = false;
    AudioService.reloadAudio(src);
  }),

  addAudioSources: action((state, sources) => {
    state.audioSources = {
      ...state.audioSources,
      ...sources
    };
  }),

  setMicrophoneAsCurrSource: action((state, setAsCurrSource) => {
    if (setAsCurrSource && !AudioService.isMicrophoneSetAsSource) {
      AudioService.switchAnalyserToMicrophone();
      state.prevSource = CustomSource.LiveAudio;
      state.currSource = CustomSource.LiveAudio;
    } else if (!setAsCurrSource && AudioService.isMicrophoneSetAsSource) {
      state.prevSource = null;
      state.currSource = null;
      AudioService.switchAnalyserToAudioElement();
    }
  }),

  clear: action((state) => {
    state.isPlaying = false;
    state.isLoadingAudioBuffer = false;
    state.didLoadAudioBuffer = false;
    state.currSource = null;
    state.audioSources = {};
    AudioService.switchAnalyserToAudioElement();
    AudioService.clear();
  })
};

export default audioState;
