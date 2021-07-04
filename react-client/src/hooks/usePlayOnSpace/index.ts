import { useOnKeyboardPress } from './../useOnKeyboardPress/index';

export const usePlayOnSpace = (
  play: () => void,
  pause: () => void,
  isPlaying: boolean
) => {
  const playOnSpace = (e: KeyboardEvent) => {
    if (e.code !== 'Space') return;

    if (isPlaying) pause();
    else play();

    return false;
  };

  useOnKeyboardPress(playOnSpace);
};
