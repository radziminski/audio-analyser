import { useEffect, useRef } from 'react';

export const useAnimationFrameLoop = (
  animationFunction: () => void,
  startCondition = true
) => {
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const onReturn = () => {
      if (animationFrameRef.current) {
        console.log('Closing animation frame', animationFrameRef.current);
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    if (!startCondition || animationFrameRef.current) return onReturn;

    const animationLoop = () => {
      animationFunction();
      animationFrameRef.current = requestAnimationFrame(animationLoop);
    };

    animationLoop();
    console.log('Starting animation frame', animationFrameRef.current);

    return onReturn;
  }, [animationFunction, startCondition]);
};
