import { useRef } from 'react';

export const AudioContext =
  window.AudioContext || // Default
  (window as any).webkitAudioContext || // Safari and old versions of Chrome
  false;

export const useAudioContext = () => {
  const { current: audioContext } = useRef(new AudioContext());

  return audioContext;
};
