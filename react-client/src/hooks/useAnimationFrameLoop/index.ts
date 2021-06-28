import { useEffect, useRef } from 'react';

export const useAnimationFrameLoop = (
  animationFunction: () => void,
  startCondition = true
) => {
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!startCondition || animationFrameRef.current) return;
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
        animationFrameRef.current = undefined;
      }
    };
  }, [animationFunction, startCondition]);
};
