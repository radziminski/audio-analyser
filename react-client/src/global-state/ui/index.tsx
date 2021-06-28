import { IAudioUIState, IUIState } from './types';
import { action } from 'easy-peasy';

const initAudioUIState: IAudioUIState = {
  waveform: {
    isOpened: true,
    barWidth: 5,
    barSpacing: 1,
    height: 140
  },
  frequency: {
    isOpened: true,
    bufferSize: 1024 * 4,
    height: 320
  },
  spectrogram: {
    isOpened: true,
    height: 320
  },
  volume: {
    isOpened: true,
    instantaneousBufferSize: 1024 * 4,
    averageBufferSize: 1024 * 16
  },
  singleParams: {
    isOpened: true
  }
};

const uiState: IUIState = {
  openedModal: null,
  modalArgs: {},
  audioUIState: initAudioUIState,

  openModal: action((state, payload) => {
    const { modal, args } = payload;

    state.openedModal = modal;
    state.modalArgs = args || {};
  }),

  closeModal: action((state) => {
    state.openedModal = null;
    state.modalArgs = {};
  }),

  modifyModalArgs: action((state, payload) => {
    const args = payload;

    state.modalArgs = { ...(state.modalArgs ?? {}), ...args };
  }),

  setWaveformState: action((state, payload) => {
    state.audioUIState.waveform = {
      ...state.audioUIState.waveform,
      ...payload
    };
  }),
  setFrequencyState: action((state, payload) => {
    state.audioUIState.frequency = {
      ...state.audioUIState.frequency,
      ...payload
    };
  }),
  setSpectrogramState: action((state, payload) => {
    state.audioUIState.spectrogram = {
      ...state.audioUIState.spectrogram,
      ...payload
    };
  }),
  setVolumeState: action((state, payload) => {
    state.audioUIState.volume = {
      ...state.audioUIState.volume,
      ...payload
    };
  }),
  setSingleParamsState: action((state, payload) => {
    state.audioUIState.singleParams = {
      ...state.audioUIState.singleParams,
      ...payload
    };
  }),
  resetToDefault: action((state) => {
    state.audioUIState = initAudioUIState;
  })
};

export default uiState;
