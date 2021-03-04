import { action, thunk, Action, Thunk, computed, Computed } from 'easy-peasy';
import { AudioController } from './audioController';

export type AudioAction<Payload = void> = Action<AudioState, Payload>;
export type AudioThunk<Payload = void> = Thunk<AudioState, Payload>;
export type AudioComputed<Result = void> = Computed<AudioState, Result>;

export interface AudioState {
  controller: AudioController | null;

  currTime: AudioComputed<number>;
  duration: AudioComputed<number>;
  isPlaying: boolean;
  isLoadingAudioBuffer: boolean;
  didLoadAudioBuffer: boolean;

  initController: AudioAction<HTMLAudioElement>;
  setIsLoadingAudioBuffer: AudioAction<boolean>;
  loadAudioBuffer: AudioThunk;
  play: AudioAction;
  pause: AudioAction;
  stop: AudioAction;
  setCurrTime: AudioAction<number>;
}

const audioState: AudioState = {
  controller: null,
  isPlaying: false,
  isLoadingAudioBuffer: false,
  didLoadAudioBuffer: false,

  loadAudioBuffer: thunk(async (actions, _, helpers) => {
    actions.setIsLoadingAudioBuffer(true);
    await helpers.getState().controller?.loadBuffer();
    actions.setIsLoadingAudioBuffer(false);
  }),

  setIsLoadingAudioBuffer: action((state, payload) => {
    state.isLoadingAudioBuffer = payload;
    if (payload) state.didLoadAudioBuffer = true;
  }),

  currTime: computed(
    (state) => state.controller?.audioElement.currentTime || 0
  ),
  duration: computed((state) => state.controller?.audioElement.duration || 0),

  initController: action((state, audioElement) => {
    const controller = AudioController.fromAudioElement(audioElement);
    state.controller = controller;

    state.didLoadAudioBuffer = !!controller.buffer;
    state.isPlaying = controller.isPlaying;
  }),

  setCurrTime: action((state, time) => {
    state.controller?.setTime(time);
  }),

  play: action((state) => {
    state.controller?.play();
    state.isPlaying = true;
  }),

  stop: action((state) => {
    state.controller?.stop();
    state.isPlaying = false;
  }),

  pause: action((state) => {
    state.controller?.pause();
    state.isPlaying = false;
  })
};

export default audioState;
