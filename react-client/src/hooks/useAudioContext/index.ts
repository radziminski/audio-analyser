import { useRef } from 'react';

import { AudioContext } from '../../services/AudioService';

export const useAudioContext = () => {
  const { current: audioContext } = useRef(new AudioContext());

  return audioContext;
};
