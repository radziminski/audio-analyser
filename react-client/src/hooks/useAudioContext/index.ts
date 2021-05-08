import { AudioContext } from './../../services/AudioControllerService';
import { useRef } from 'react';

export const useAudioContext = () => {
  const { current: audioContext } = useRef(new AudioContext());

  return audioContext;
};
