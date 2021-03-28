export const getFrequencyLabels = () => {
  const points = Array.from(Array(10).keys()).slice(1);
  console.log(points);
  const labels: number[] = [];
  for (let power = 1; power <= 3; power++) {
    labels.push(
      ...points.reduce<number[]>((acc, curr) => {
        acc.push(Math.pow(10, power) * curr);
        return acc;
      }, [])
    );
  }
  return labels;
};
