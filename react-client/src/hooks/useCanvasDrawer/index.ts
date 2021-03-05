import { useElementDimensions } from 'hooks/useElementDimensions';
import p5 from 'p5';
import { useEffect, useState, useCallback, useRef } from 'react';

const CANVAS_RESIZE_DEBOUNCE_MS = 50;

export const useCanvasDrawer = <T extends HTMLElement | null>(
  containerRef: React.MutableRefObject<T>,
  canvasHeight?: number,
  canvasWidth?: number
) => {
  const [canvasDrawer, setCanvasDrawer] = useState<p5>();
  const [ready, setReady] = useState<boolean>(false);

  const {
    width: containerWidth,
    height: containerHeight,
    dimensionsReady
  } = useElementDimensions(containerRef, true, CANVAS_RESIZE_DEBOUNCE_MS);

  const canvasDrawFunction = useCallback(
    (p: p5) => {
      p.setup = function () {
        p.createCanvas(
          canvasWidth ?? containerWidth ?? 0,
          canvasHeight ?? containerHeight ?? 0
        );

        setReady(true);
      };
    },
    [containerWidth, containerHeight]
  );

  useEffect(() => {
    if (containerRef.current && !canvasDrawer && dimensionsReady) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const currCanvasDrawer = new p5(
        canvasDrawFunction,
        containerRef.current!
      );

      setCanvasDrawer(currCanvasDrawer);
    }

    return canvasDrawer?.remove();
  }, [containerRef.current, dimensionsReady]);

  useEffect(() => {
    // Handle container resize
    if (
      containerRef.current &&
      containerWidth &&
      containerHeight &&
      canvasDrawer
    ) {
      canvasDrawer?.remove();

      const currCanvasDrawer = new p5(
        canvasDrawFunction,
        containerRef.current!
      );

      setCanvasDrawer(currCanvasDrawer);
    }
  }, [containerWidth, containerHeight]);

  if (!canvasDrawer) {
    return {
      ready: false,
      canvasDrawer: undefined
    };
  }

  return {
    ready: ready,
    canvasDrawer: canvasDrawer
  };
};
