import { getVolumeRelativeToContainer } from '~/utils/audio';
import p5 from 'p5';

const INST_NORMALIZING_OFFSET = 2.5;
const AVG_NORMALIZING_OFFSET = 1;

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

const ORANGE_COLOR_DB_THRESHOLD = 9;
const RED_COLOR_DB_THRESHOLD = 0;

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

  const { currSample, actualValueDb } = getHeightForValue(
    value,
    containerHeight,
    bottomBorderRadius,
    INST_NORMALIZING_OFFSET
  );

  const offsetX = type === 'left' ? 0 : containerWidth / 2 + barsSpacing;
  const bottomLeftRadius = type === 'left' ? bottomBorderRadius : 0;
  const bottomRightRadius = type === 'right' ? bottomBorderRadius : 0;

  const maxGreenRectHeight = getCurrSampleHeightFromDb(
    ORANGE_COLOR_DB_THRESHOLD,
    containerHeight
  );

  const maxYellowRectHeight = getCurrSampleHeightFromDb(
    RED_COLOR_DB_THRESHOLD,
    containerHeight
  );

  const barWidth = (containerWidth - barsSpacing) / 2;

  if (clear) canvasDrawer.clear();
  canvasDrawer.noStroke();

  if (actualValueDb < ORANGE_COLOR_DB_THRESHOLD) {
    const greenStart = maxGreenRectHeight;
    const greenHeight = containerHeight - maxGreenRectHeight;
    let orangeStart = currSample;
    let orangeHeight =
      containerHeight - currSample - (containerHeight - maxGreenRectHeight);

    canvasDrawer.fill('#48A300');
    canvasDrawer.rect(
      offsetX,
      greenStart > 0 ? greenStart : +containerHeight,
      barWidth,
      greenHeight > 0 ? greenHeight : 0,
      0,
      0,
      bottomRightRadius,
      bottomLeftRadius
    );

    if (actualValueDb < RED_COLOR_DB_THRESHOLD) {
      orangeStart = maxYellowRectHeight;
      orangeHeight =
        containerHeight -
        maxYellowRectHeight -
        (containerHeight - maxGreenRectHeight);

      const redStart = currSample;
      const redHeight =
        containerHeight - currSample - (containerHeight - maxYellowRectHeight);

      canvasDrawer.fill('#FF0000');
      canvasDrawer.rect(
        offsetX,
        redStart > 0 ? redStart : +containerHeight,
        barWidth,
        redHeight > 0 ? redHeight : 0,
        type === 'right' ? topBorderRadius : 0,
        type === 'left' ? topBorderRadius : 0,
        0,
        0
      );
    }

    canvasDrawer.fill('#ECB831');
    canvasDrawer.rect(
      offsetX,
      orangeStart > 0 ? orangeStart : +containerHeight,
      barWidth,
      orangeHeight > 0 ? orangeHeight : 0,
      type === 'right' ? topBorderRadius : 0,
      type === 'left' ? topBorderRadius : 0,
      0,
      0
    );
  } else {
    const greenStart = currSample;
    const greenHeight =
      containerHeight - currSample > 0 ? containerHeight - currSample : 0;

    canvasDrawer.fill('#48A300');
    canvasDrawer.rect(
      offsetX,
      greenStart > 0 ? greenStart : +containerHeight,
      barWidth,
      greenHeight > 0 ? greenHeight : 0,
      type === 'right' ? topBorderRadius : 0,
      type === 'left' ? topBorderRadius : 0,
      bottomRightRadius,
      bottomLeftRadius
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

  const { currSample } = getHeightForValue(
    value,
    containerHeight,
    0,
    AVG_NORMALIZING_OFFSET
  );

  if (currSample === containerHeight) return;

  const offsetX = type === 'left' ? 0 : containerWidth / 2 + barsSpacing;
  const barWidth = (containerWidth - barsSpacing) / 2;

  canvasDrawer.stroke(255, 0, 0);
  canvasDrawer.line(
    offsetX,
    currSample,
    type === 'left' ? barWidth : containerWidth,
    currSample
  );
};

const getCurrSampleHeightFromDb = (
  sampleValue: number,
  containerHeight: number
) => {
  return (
    (getVolumeRelativeToContainer(sampleValue / 3) / 100) * containerHeight +
    0.1 * containerHeight
  );
};

const getHeightForValue = (
  value: number,
  containerHeight: number,
  bottomBorderRadius: number,
  normalizingOffset: number
) => {
  let currSample = value;

  if (
    !value ||
    value === -Infinity ||
    value === Infinity ||
    isNaN(value) ||
    value < -100 ||
    value > 100
  )
    currSample = -100;

  currSample = Math.round((Math.abs(currSample) - 1.96) * 1000) / 1000;

  currSample = currSample - normalizingOffset;
  const actualValueDb = currSample;

  const val = getCurrSampleHeightFromDb(currSample, containerHeight);

  currSample =
    val < 0 || !val
      ? containerHeight
      : val > containerHeight - bottomBorderRadius
      ? containerHeight
      : val;

  return { currSample, actualValueDb };
};
