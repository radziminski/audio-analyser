import {
  calculateBufferAverage,
  calculateBufferMaxAverage,
  getVolumeRelativeToContainer,
  sampleToDecibel
} from './../audio';

const itReturnsZeroForEmptyBuffer = (fn: (buffer: Float32Array) => number) => {
  it('returns zero for zero input', () => {
    const value = fn(new Float32Array([]));
    expect(value).toBe(0);
  });
};

const itReturnsZeroForZeroInput = (fn: (value: number) => number) => {
  it('returns zero for zero input', () => {
    const value = fn(0);
    expect(value).toBe(0);
  });
};

describe('sampleToDecibel', () => {
  itReturnsZeroForZeroInput(sampleToDecibel);
});

describe('calculateBufferAverage', () => {
  itReturnsZeroForEmptyBuffer(calculateBufferAverage);
});

describe('calculateBufferMaxAverage', () => {
  itReturnsZeroForEmptyBuffer(calculateBufferMaxAverage);
});

describe('getVolumeRelativeToContainer', () => {
  itReturnsZeroForZeroInput(getVolumeRelativeToContainer);
});
