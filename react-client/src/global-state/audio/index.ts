import { action, thunk, Action, Thunk, computed, Computed } from 'easy-peasy';
import { AudioController } from 'services/AudioController';

export type AudioAction<Payload = void> = Action<AudioState, Payload>;
export type AudioThunk<Payload = void> = Thunk<AudioState, Payload>;

export interface AudioState {
  controller: WaveSurfer | null;
  audioElement: HTMLAudioElement | null;
  currTime: number;
  duration: number;
  isPlaying: boolean;
  setAudioElement: AudioAction<HTMLAudioElement>;
  setController: AudioAction<WaveSurfer>;
  initController: AudioThunk<{
    url: string | HTMLAudioElement;
    ref: HTMLElement | HTMLDivElement;
  }>;
  play: AudioAction;
  pause: AudioAction;
  stop: AudioAction;
  setCurrTime: AudioAction<number>;
  setDuration: AudioAction<number>;
}

const audioState: AudioState = {
  controller: null,
  currTime: 0,
  isPlaying: false,
  duration: 0,
  audioElement: null,

  setAudioElement: action((state, audioElement) => {
    state.audioElement = audioElement;
  }),

  initController: thunk(async (actions, payload, helpers) => {
    const controller: WaveSurfer = await helpers.injections.wavesurferService.create(
      {
        container: payload.ref,
        backend: 'MediaElement'
      }
    );
    console.log(controller.backend);

    const updateTime = () => {
      const time = controller.getCurrentTime();
      if (time && time != helpers.getState().currTime)
        actions.setCurrTime(time);
    };
    controller.load(payload.url);
    controller.on('ready', () => {
      actions.setDuration(controller.getDuration());
    });
    controller.on('audioprocess', () => {
      if (controller.isPlaying()) {
        updateTime();
      }
    });
    controller.on('interaction', () => {
      setTimeout(() => updateTime(), 50);
    });
    controller.on('finish', () => {
      actions.stop();
    });

    actions.setController(controller);
  }),

  setCurrTime: action((state, currTime) => {
    state.currTime = currTime;
  }),
  setDuration: action((state, duration) => {
    state.duration = duration;
  }),

  setController: action((state, controller) => {
    state.controller = controller;
  }),

  play: action((state) => {
    console.log('playing...');
    if (state.audioElement) {
      state.audioElement.play();
    }
    state.isPlaying = true;
  }),

  stop: action((state) => {
    console.log('stoping...');
    if (state.audioElement && !state.audioElement.paused) {
      state.audioElement.currentTime = 0;
      state.audioElement.pause();
    }
    state.isPlaying = false;
  }),

  pause: action((state) => {
    console.log('pausing...');
    if (state.audioElement && !state.audioElement.paused) {
      state.audioElement.pause();
    }
    state.isPlaying = false;
  })
};

export default audioState;
