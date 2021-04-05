export const sampleToDecibel = (value: number) => 10 * Math.log10(value);

export const calculateBufferAverage = (buffer: Float32Array) => {
  let sumOfSquares = 0;
  for (let i = 0; i < buffer.length; i++) {
    sumOfSquares += buffer[i] ** 2;
  }

  return sampleToDecibel(sumOfSquares / buffer.length);
};

export const calculateBufferMaxAverage = (_: Float32Array) => {
  // const maxSamples = buffer
  //   .sort()
  //   .reverse()
  //   .subarray(0, buffer.length / 4);

  // let sumOfSquares = 0;
  // for (let i = 0; i < maxSamples.length; i++) {
  //   const value = maxSamples[i] ** 2;
  //   sumOfSquares += value;
  // }
  // const avgPower = sumOfSquares / maxSamples.length;

  // return sampleToDecibel(avgPower);
  return 1;
};

// Makes no sense! - its updating every 8 bars so its too late
export const calculateBufferAverageMax = (
  buffer: Float32Array,
  subBufferSize = 1024 * 4
) => {
  const subBuffersNum = Math.round(buffer.length / subBufferSize);

  const subBuffersAverages: number[] = [];

  for (let i = 0; i < subBuffersNum; i++) {
    const subBufferStart = i * subBufferSize;
    const avg = calculateBufferAverage(
      buffer.slice(subBufferStart, subBufferStart + subBufferSize)
    );
    subBuffersAverages.push(Math.round(avg));
  }
  return subBuffersAverages.sort().reverse()[0];
};

export const getVolumeRelativeToContainer = (
  volumeValue: number,
  topMargin?: number
) => {
  // console.log(
  //   (volumeValue / 10) * 100 * Math.pow(0.975, Math.round(volumeValue)) +
  //     (topMargin || 0)
  // );
  return (
    (volumeValue / 10) * 100 * Math.pow(0.975, Math.round(volumeValue)) +
    (topMargin || 0)
  );
};
