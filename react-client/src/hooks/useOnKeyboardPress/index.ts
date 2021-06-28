import { RefObject, useEffect } from 'react';
export const useOnKeyboardPress = <T extends HTMLElement>(
  callback: (key: string) => void,
  preventDefault = false,
  rootElementRef?: RefObject<T>
) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (preventDefault) e.preventDefault();
      callback(e.code);

      if (preventDefault) return false;
    };

    const rootElement = rootElementRef?.current;
    if (rootElement) {
      rootElement.addEventListener('keydown', onKey);
      return () => rootElement.removeEventListener('keydown', onKey);
    }

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [callback]);
};
