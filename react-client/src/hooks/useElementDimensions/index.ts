import { useState, useEffect } from 'react';

export const useElementDimensions = <T extends HTMLElement | null>(
  ref: React.MutableRefObject<T>
) => {
  const [height, setHeight] = useState<number>();
  const [width, setWidth] = useState<number>();
  const [left, setLeft] = useState<number>();

  useEffect(() => {
    if (ref.current) {
      const width = ref.current.getBoundingClientRect().width;
      setWidth(width);
      const height = ref.current.getBoundingClientRect().height;
      setHeight(height);
      const left = ref.current.getBoundingClientRect().left;
      setLeft(left);
    }
  }, [ref]);

  if (!ref.current) {
    return {
      width: 0,
      height: 0,
      left: 0,
      dimensionsReady: false
    };
  }

  return {
    width,
    height,
    left,
    dimensionsReady: true
  };
};
