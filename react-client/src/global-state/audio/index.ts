import { IAudioState } from './types';
import { action, thunk, computed } from 'easy-peasy';
import AudioService from '../../services/AudioControllerService';

const audioState: IAudioState = {
  isPlaying: false,
  isLoadingAudioBuffer: false,
  didLoadAudioBuffer: false,
  currSource: null,
  audioSources: {
    // song: require('src/assets/song.mp3'),
    // guitar: require('src/assets/guitar.wav'),
    // volumes: require('src/assets/volumes.wav'),
    // max: require('src/assets/max.wav'),
    // change: require('src/assets/change.wav'),
    // noise: require('src/assets/noise.wav'),
    // freqs: require('src/assets/freqs.wav'),
    // mp3: require('src/assets/sampleMp3.mp3'),
    // mp3Long: require('src/assets/sampleLong.mp3')
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
