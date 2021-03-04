import { useElementDimensions } from 'hooks/useElementDimensions';
import p5 from 'p5';
import { useEffect, useState } from 'react';

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
  } = useElementDimensions(containerRef);

  useEffect(() => {
    if (
      containerRef &&
      containerRef.current &&
      !canvasDrawer &&
      dimensionsReady
    ) {
      const sketch = function (p: p5) {
        p.setup = function () {
          p.createCanvas(
            canvasWidth ?? containerWidth ?? 0,
            canvasHeight ?? containerHeight ?? 0
          );

          setReady(true);
        };
      };

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const p5Drawer = new p5(sketch, containerRef.current!);

      setCanvasDrawer(p5Drawer);
    }
    return canvasDrawer?.remove();
  }, [containerRef.current, dimensionsReady]);

  if (!canvasDrawer) {
    return {
      ready: false,
      canvasDrawer
    };
  }

  return {
    ready: ready,
    canvasDrawer
  };
};
