export const formatTime = (currTime: number): string => {
  let minutes = 0;
  let time = Math.round(currTime);

  while (time >= 60) {
    minutes++;
    time -= 60;
  }

  return `${minutes.toString().length < 2 ? '0' + minutes : minutes}:${
    time.toString().length < 2 ? '0' + time : time
  }`;
};
