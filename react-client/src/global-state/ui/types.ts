import { Action, Thunk } from 'easy-peasy';

import { IModalArgs, ModalType } from '~/components/Modal/types';

export type UIAction<Payload = void> = Action<IUIState, Payload>;

export type UIThunk<Payload = void, Result = void> = Thunk<
  IUIState,
  Payload,
  Result
>;

export interface IDefaultWidgetState {
  isOpened: boolean;
}

export interface IWaveformState extends IDefaultWidgetState {
  barWidth: number;
  barSpacing: number;
  height: number;
}

export interface IFrequencyState extends IDefaultWidgetState {
  bufferSize: number;
  height: number;
}
export interface ISpectrogramState extends IDefaultWidgetState {
  height: number;
  bufferSize: number;
}
export interface IVolumeState extends IDefaultWidgetState {
  instantaneousBufferSize: number;
  averageBufferSize: number;
}
export interface IBandsState {
  isChromaOpened: boolean;
  isMfccOpened: boolean;
  bufferSize: number;
}
export interface ICoefficientsState extends IDefaultWidgetState {
  isRmsShown: boolean;
  isCentroidShown: boolean;
  isRolloffShown: boolean;
  bufferSize: number;
  height: number;
}

export interface IAudioUIState {
  waveform: IWaveformState;
  frequency: IFrequencyState;
  spectrogram: ISpectrogramState;
  volume: IVolumeState;
  bands: IBandsState;
  coefficients: ICoefficientsState;
}

export interface IUIState {
  openedModal: ModalType | null;
  modalArgs: IModalArgs;
  audioUIState: IAudioUIState;

  openModal: UIAction<{ modal: ModalType; args?: IModalArgs }>;
  modifyModalArgs: UIAction<IModalArgs>;
  closeModal: UIAction;

  setWaveformState: UIAction<Partial<IWaveformState>>;
  setFrequencyState: UIAction<Partial<IFrequencyState>>;
  setSpectrogramState: UIAction<Partial<ISpectrogramState>>;
  setVolumeState: UIAction<Partial<IVolumeState>>;
  setBandsState: UIAction<Partial<IBandsState>>;
  setCoefficientsState: UIAction<Partial<ICoefficientsState>>;
  resetToDefault: UIAction;
}
