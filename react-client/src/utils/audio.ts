export const sampleToDecibel = (value: number) => 10 * Math.log10(value);

export const calculateBufferAverage = (buffer: Float32Array) => {
  let sumOfSquares = 0;
  for (let i = 0; i < buffer.length; i++) {
    sumOfSquares += buffer[i] ** 2;
  }
  return sampleToDecibel(sumOfSquares / buffer.length);
};

export const calculateBufferMaxAverage = (buffer: Float32Array) => {
  const maxSamples = buffer
    .sort()
    .reverse()
    .subarray(0, buffer.length / 4);

  let sumOfSquares = 0;
  for (let i = 0; i < maxSamples.length; i++) {
    const value = maxSamples[i] ** 2;
    sumOfSquares += value;
  }
  const avgPower = sumOfSquares / maxSamples.length;

  return sampleToDecibel(avgPower);
};
