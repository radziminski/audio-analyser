import p5 from 'p5';

const ORANGE_COLOR_DB_THRESHOLD = 15;

export const drawInstantaneousVolume = (
  valueLeft: number,
  valueRight: number,
  canvasDrawer: p5 | undefined,
  containerHeight: number,
  containerWidth: number,
  barsSpacing: number,
  bottomBorderRadius = 0,
  topBorderRadius = 0
) => {
  drawInstantaneousVolumeSide(
    valueLeft,
    'left',
    true,
    canvasDrawer,
    containerHeight,
    containerWidth,
    barsSpacing,
    bottomBorderRadius,
    topBorderRadius
  );
  drawInstantaneousVolumeSide(
    valueRight,
    'right',
    false,
    canvasDrawer,
    containerHeight,
    containerWidth,
    barsSpacing,
    bottomBorderRadius,
    topBorderRadius
  );
};

export const drawMaxAverageVolume = (
  valueLeft: number,
  valueRight: number,
  canvasDrawer: p5 | undefined,
  containerHeight: number,
  containerWidth: number,
  barsSpacing: number
) => {
  drawMaxAverageVolumeSide(
    valueLeft,
    'left',
    canvasDrawer,
    containerHeight,
    containerWidth,
    barsSpacing
  );
  drawMaxAverageVolumeSide(
    valueRight,
    'right',
    canvasDrawer,
    containerHeight,
    containerWidth,
    barsSpacing
  );
};

export const drawInstantaneousVolumeSide = (
  value: number,
  type: 'left' | 'right',
  clear = false,
  canvasDrawer: p5 | undefined,
  containerHeight: number,
  containerWidth: number,
  barsSpacing: number,
  bottomBorderRadius = 0,
  topBorderRadius = 0
) => {
  if (!canvasDrawer) return;

  let currSample = value;

  if (!value || value === -Infinity || value === Infinity || isNaN(value))
    currSample = containerHeight;

  const offsetX = type === 'left' ? 0 : containerWidth / 2 + barsSpacing;

  currSample = Math.abs(currSample) * 7;
  const maxGreenRectHeight = ORANGE_COLOR_DB_THRESHOLD * 7;

  const barWidth = (containerWidth - barsSpacing) / 2;

  if (clear) canvasDrawer.clear();
  canvasDrawer.noStroke();

  if (value > -ORANGE_COLOR_DB_THRESHOLD) {
    canvasDrawer.fill('#48A300');
    canvasDrawer.rect(
      offsetX,
      maxGreenRectHeight,
      barWidth,
      containerHeight - maxGreenRectHeight,
      0,
      0,
      type === 'right' ? bottomBorderRadius : 0,
      type === 'left' ? bottomBorderRadius : 0
    );
    canvasDrawer.fill('#ECB831');
    canvasDrawer.rect(
      offsetX,
      currSample,
      barWidth,
      containerHeight - currSample - (containerHeight - maxGreenRectHeight),
      type === 'right' ? topBorderRadius : 0,
      type === 'left' ? topBorderRadius : 0,
      0,
      0
    );
  } else {
    canvasDrawer.fill('#48A300');
    canvasDrawer.rect(
      offsetX,
      currSample,
      barWidth,
      containerHeight - currSample > 0 ? containerHeight - currSample : 0,
      type === 'right' ? topBorderRadius : 0,
      type === 'left' ? topBorderRadius : 0,
      type === 'right' ? bottomBorderRadius : 0,
      type === 'left' ? bottomBorderRadius : 0
    );
  }
};

export const drawMaxAverageVolumeSide = (
  value: number,
  type: 'left' | 'right',
  canvasDrawer: p5 | undefined,
  containerHeight: number,
  containerWidth: number,
  barsSpacing: number
) => {
  if (!canvasDrawer) return;

  let currSample = value;

  if (!value || value === -Infinity || value === Infinity || isNaN(value))
    currSample = containerHeight;

  const offsetX = type === 'left' ? 0 : containerWidth / 2 + barsSpacing;
  const barWidth = (containerWidth - barsSpacing) / 2;

  currSample = Math.abs(currSample) * 7;

  canvasDrawer.stroke(255, 0, 0);
  canvasDrawer.line(
    offsetX,
    currSample,
    type === 'left' ? barWidth : containerWidth,
    currSample
  );
};
