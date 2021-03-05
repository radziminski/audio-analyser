import { useEffect } from 'react';
export const useOnKeyboardPress = (callback: (key: string) => void) => {
  useEffect(() => {
    const onKey = (e) => callback(e.code);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [callback]);
};
