import { ModalType, IModalArgs } from '~/components/Modal/types';
import { Action, Thunk } from 'easy-peasy';

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
}
export interface IVolumeState extends IDefaultWidgetState {
  instantaneousBufferSize: number;
  averageBufferSize: number;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ISingleParamsState extends IDefaultWidgetState {}

export interface IAudioUIState {
  waveform: IWaveformState;
  frequency: IFrequencyState;
  spectrogram: ISpectrogramState;
  volume: IVolumeState;
  singleParams: ISingleParamsState;
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
  setSingleParamsState: UIAction<Partial<ISingleParamsState>>;
  resetToDefault: UIAction;
}
