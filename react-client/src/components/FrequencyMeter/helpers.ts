import { sampleToDecibel } from '~/utils/audio';
export const getFrequencyLabels = () => {
  const points = Array.from(Array(10).keys()).slice(1);
  const labels: number[] = [];
  for (let power = 1; power <= 3; power++) {
    labels.push(
      ...points.reduce<number[]>((acc, curr) => {
        if (power === 1 && curr === 1) return acc;
        acc.push(Math.pow(10, power) * curr);
        return acc;
      }, [])
    );
  }
  return labels;
};

export const toLog = function (value: number, min: number, max: number) {
  const exp = (value - min) / (max - min);
  return min * Math.pow(max / min, exp);
};

export const getLogValue = (
  index: number,
  samples: Float32Array,
  length: number,
  width: number,
  height: number,
  minDecibels: number,
  fftSize: number
) => {
  const sampleNumPerWidth = (index * fftSize) / width;
  const logIndex = toLog(sampleNumPerWidth, fftSize / width, fftSize);
  const lowIndex = Math.floor(logIndex);
  const highIndex = Math.ceil(logIndex);
  const highValue = samples[highIndex];
  const lowValue = samples[lowIndex];
  const w = (logIndex - lowIndex) / (highIndex - lowIndex);
  const value = lowValue + (highValue - lowValue) * w;

  const currSampleDecNew =
    !Number.isFinite(lowValue) || !Number.isFinite(highValue)
      ? height
      : (sampleToDecibel(Math.abs(value)) * height) / minDecibels;

  // if (value && Number.isFinite(value)) {
  //   console.log(index, logIndex, value);
  // }

  return currSampleDecNew || 0.001;
};

export const getLabelsLocations = (
  containerWidth: number,
  sampleRate: number
) => {
  const maxFreq = sampleRate / 2;

  const labels = getFrequencyLabels();
  labels.push(10000, 20000);

  const labelsValues = {};

  const arr: number[] = [];

  for (let sampleNum = 1; sampleNum < containerWidth; sampleNum++) {
    const samplePerWidth = (sampleNum * maxFreq) / containerWidth;
    const logIndex = toLog(samplePerWidth, maxFreq / containerWidth, maxFreq);
    arr.push(logIndex);
    labels.forEach((label) => {
      if (
        !labelsValues[label] ||
        Math.abs(logIndex - label) < Math.abs(arr[labelsValues[label]] - label)
      ) {
        labelsValues[label] = sampleNum;
      }
    });
  }

  return labelsValues;
};

const omittedLabels = [4, 6, 8, 9];
export const printLabel = (label: string) => {
  if (omittedLabels.some((currLabel) => label.startsWith(currLabel.toString())))
    return null;
  if (label.endsWith('000')) return label.substring(0, label.length - 3) + 'k';
  return label;
};
