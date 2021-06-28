import { useOnKeyboardPress } from './../useOnKeyboardPress/index';

export const usePlayOnSpace = (
  play: () => void,
  pause: () => void,
  isPlaying: boolean
) => {
  const playOnSpace = (code: string) => {
    if (code !== 'Space') return;

    if (isPlaying) pause();
    else play();
  };

  useOnKeyboardPress(playOnSpace, true);
};
