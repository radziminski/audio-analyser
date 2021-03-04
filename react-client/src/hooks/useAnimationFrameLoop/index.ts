import { useEffect, useState } from 'react';

export const useAnimationFrameLoop = (animationFunction: () => void) => {
  const [currAnimationFrameId, setCurrAnimationFrameId] = useState<number>();

  useEffect(() => {
    const animationLoop = () => {
      animationFunction();
      const id = requestAnimationFrame(animationLoop);
      setCurrAnimationFrameId(id);
    };

    animationLoop();
    return () =>
      currAnimationFrameId
        ? cancelAnimationFrame(currAnimationFrameId)
        : undefined;
  }, [animationFunction]);
};
