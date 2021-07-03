import { useElementDimensions } from '~/hooks/useElementDimensions';
import p5 from 'p5';
import { useEffect, useState, useCallback } from 'react';

export type CanvasDrawer = p5;

const CANVAS_RESIZE_DEBOUNCE_MS = 50;

export const useCanvasDrawer = <T extends HTMLElement | null>(
  containerRef: React.MutableRefObject<T>,
  canvasHeight?: number,
  canvasWidth?: number
): {
  canvasDrawer: CanvasDrawer | undefined;
  ready: boolean;
} => {
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

        /** Canvas always needs to have 0.5 added
         * to each coordinate otherwise its blurry */
        p.translate(0.5, 0.5);

        setReady(true);
      };
    },
    [containerWidth, containerHeight, canvasWidth, canvasHeight]
  );

  useEffect(() => {
    if (containerRef.current && !canvasDrawer && dimensionsReady) {
      const currCanvasDrawer = new p5(
        canvasDrawFunction,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        containerRef.current!
      );

      setCanvasDrawer(currCanvasDrawer);
    }

    return () => canvasDrawer?.remove();

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        containerRef.current!
      );

      setCanvasDrawer(currCanvasDrawer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerWidth, containerHeight]);

  if (!canvasDrawer) {
    return {
      ready: false,
      canvasDrawer: undefined
    };
  }

  return {
    ready,
    canvasDrawer
  };
};
