import { Action, Computed, Thunk } from 'easy-peasy';

export type AudioAction<Payload = void> = Action<IAudioState, Payload>;
export type AudioThunk<Payload = void> = Thunk<IAudioState, Payload>;
export type AudioComputed<Result = void> = Computed<IAudioState, Result>;

export enum CustomSource {
  LiveAudio = 'live-audio'
}

export interface IAudioState {
  currTime: AudioComputed<number>;
  duration: AudioComputed<number>;
  isPlaying: boolean;
  isLoadingAudioBuffer: boolean;
  didLoadAudioBuffer: boolean;
  currSource: string | CustomSource | null;
  prevSource: string | null;
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
  clear: AudioAction;
  setMicrophoneAsCurrSource: AudioAction<boolean>;
}
