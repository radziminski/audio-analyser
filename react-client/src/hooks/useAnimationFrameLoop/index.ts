import { useCallback, useEffect, useRef } from 'react';

export const useAnimationFrameLoop = (
  animationFunction: () => void,
  startCondition = true
) => {
  const animationFrameRef = useRef<number>();

  const animationLoop = useCallback(() => {
    animationFunction();
    animationFrameRef.current = requestAnimationFrame(animationLoop);
  }, [animationFunction]);

  useEffect(() => {
    if (!startCondition) return;

    if (animationFrameRef.current) {
      console.log('Closing animation frame', animationFrameRef.current);
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(animationLoop);
    console.log('Starting animation frame', animationFrameRef.current);

    return () => {
      if (animationFrameRef.current) {
        console.log('Closing animation frame', animationFrameRef.current);
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animationLoop, startCondition]);
};
