import { useEffect, useRef } from 'react';

export const useAnimationFrameLoop = (animationFunction: () => void) => {
  const requestRef = useRef<number>();

  useEffect(() => {
    const animationLoop = () => {
      animationFunction();
      requestRef.current = requestAnimationFrame(animationLoop);
    };

    animationLoop();
    return () =>
      requestRef.current ? cancelAnimationFrame(requestRef.current) : undefined;
  }, [animationFunction]);
};
