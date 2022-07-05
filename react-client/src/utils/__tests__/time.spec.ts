import { formatTime } from './../time';

describe('formatTime', () => {
  it('properly formats zero time', () => {
    const value = formatTime(0);
    expect(value).toBe('00:00');
  });
});
