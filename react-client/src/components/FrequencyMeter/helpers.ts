import { sampleToDecibel } from 'utils/audio';
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

export const toLog = function (value, min, max) {
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
