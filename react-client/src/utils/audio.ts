export const sampleToDecibel = (value: number) => 10 * Math.log10(value);

export const calculateBufferAverage = (buffer: Float32Array) => {
  let sumOfSquares = 0;
  const sampleMultiplier = 4;
  const valuableSamplesNum = buffer.length / sampleMultiplier;
  for (let i = 0; i < valuableSamplesNum; i++) {
    sumOfSquares += buffer[i * sampleMultiplier] ** 2;
  }

  return sampleToDecibel(sumOfSquares / valuableSamplesNum);
};

export const calculateBufferMaxAverage = (buffer: Float32Array) => {
  const maxSamples = buffer
    .sort()
    .reverse()
    .slice(0, buffer.length / 4);

  let sumOfSquares = 0;

  for (let i = 0; i < maxSamples.length; i++) {
    const value = maxSamples[i] ** 2;
    sumOfSquares += value;
  }
  const avgPower = sumOfSquares / maxSamples.length;

  return sampleToDecibel(avgPower);
};

export const getVolumeRelativeToContainer = (
  volumeValue: number,
  topMargin?: number
) => {
  return (
    (volumeValue / 10) * 100 * Math.pow(0.975, Math.round(volumeValue)) +
    (topMargin || 0)
  );
};
