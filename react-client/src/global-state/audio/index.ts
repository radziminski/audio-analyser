import { AudioController } from 'services/AudioController';
import { action, thunk, Action, Thunk } from 'easy-peasy';

export type AudioAction<Payload = void> = Action<AudioState, Payload>;
export type AudioThunk<Payload = void> = Thunk<AudioState, Payload>;

export interface AudioState {
  controller: AudioController | null;
  currTime: number;
  isPlaying: boolean;
  setController: AudioAction<AudioController>;
  initAudioController: AudioThunk<{ url: string }>;
  play: AudioAction;
  pause: AudioAction;
  stop: AudioAction;
}

const audioState: AudioState = {
  controller: null,
  currTime: 0,
  isPlaying: false,

  initAudioController: thunk(async (actions, payload, helpers) => {
    const controller = await AudioController.fromUrl(payload.url);
    actions.setController(controller);
  }),

  setController: action((state, controller) => {
    state.controller = controller;
  }),

  play: action((state) => {
    if (state.controller) {
      state.controller.play();
    }
    state.isPlaying = true;
  }),

  stop: action((state) => {
    if (state.controller) {
      state.controller?.stop();
    }
    state.isPlaying = false;
    state.currTime = 0;
  }),

  pause: action((state) => {
    if (state.controller) {
      state.controller.pause();
      state.currTime = state.controller.currTime;
    }
    state.isPlaying = false;
  })
};

export default audioState;
