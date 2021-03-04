import { useEffect } from 'react';

export const usePlayOnSpace = (
  play: () => void,
  pause: () => void,
  isPlaying: boolean
) => {
  useEffect(() => {
    const playOnSpace = (e: KeyboardEvent) => {
      if (e.code !== 'Space') return;

      if (isPlaying) pause();
      else play();
    };

    document.addEventListener('keydown', playOnSpace);
    return () => document.removeEventListener('keydown', playOnSpace);
  }, [play, pause]);
};
