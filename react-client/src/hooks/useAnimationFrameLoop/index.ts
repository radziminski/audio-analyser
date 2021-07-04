import { useEffect, useRef } from 'react';

export const useAnimationFrameLoop = (
  animationFunction: () => void,
  startCondition = true
) => {
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!startCondition) return;

    if (animationFrameRef.current) {
      console.log('Closing animation frame', animationFrameRef.current);
      cancelAnimationFrame(animationFrameRef.current);
    }

    const animationLoop = () => {
      animationFunction();
      animationFrameRef.current = requestAnimationFrame(animationLoop);
    };

    animationLoop();
    console.log('Starting animation frame', animationFrameRef.current);

    return () => {
      if (animationFrameRef.current) {
        console.log('Closing animation frame', animationFrameRef.current);
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animationFunction, startCondition]);
};
