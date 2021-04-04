import AudioService from 'global-state/audio/audioController';
import React, { useEffect, useRef } from 'react';
import Box from 'components/Box';
import { useCanvasDrawer, useAnimationFrameLoop } from 'hooks';
import { COLORS } from 'styles/theme';
import { getFrequencyLabels, getLogValue } from './helpers';

const barWidth = 1;
const minDecibels = 23;
const height = 400;
const width = 512;

const FrequencyMeter: React.FC = () => {
  const analyser = useRef<AnalyserNode>();
  const container = useRef<HTMLDivElement | null>(null);
  const { canvasDrawer, ready } = useCanvasDrawer(container);
  const valuableSamplesNumber = (analyser.current?.fftSize || 0) / 2;

  const getFreq = () => {
    if (!canvasDrawer) return;
    if (!analyser.current) return;
    canvasDrawer.clear();

    const currAnalyser = analyser.current;
    const buffer = new Float32Array(currAnalyser.fftSize);
    currAnalyser.getFloatFrequencyData(buffer);

    const samplesInLog: number[] = [];

    for (let sampleNum = 1; sampleNum < valuableSamplesNumber; sampleNum++) {
      samplesInLog.push(
        getLogValue(
          sampleNum,
          buffer,
          valuableSamplesNumber,
          width,
          height,
          minDecibels
        )
      );
    }

    samplesInLog.slice(0, width - 2).forEach((point, sampleNum) => {
      const currHeight = point;

      canvasDrawer.stroke(COLORS.accentPrimary100);
      canvasDrawer.rect(sampleNum, currHeight, barWidth, height - currHeight);
    });
  };

  useAnimationFrameLoop(
    getFreq,
    ready && !!analyser.current && !!container.current
  );

  useEffect(() => {
    const currAnalyser = AudioService.createAnalyser();
    currAnalyser.analyserNode.fftSize = 1024 * 2;
    analyser.current = currAnalyser.analyserNode;
    analyser.current.smoothingTimeConstant = 0.9;
  }, []);

  console.log(getFrequencyLabels());

  return (
    <>
      <button onClick={() => getFreq()}>GET FREQ</button>
      <Box width={width} height={height} ref={container}></Box>
    </>
  );
};

export default FrequencyMeter;

// const points = [
//   [1.1, 1],
//   [1.2, 4],
//   [1.3, 8],
//   [4, 2],
//   [5.5, 2],
//   [7, 2],
//   [8, 1]
// ];

// const interp = new CurveInterpolator(points, { tension: 0.2 });

// // get points evently distributed along the curve
// const segments = 20;
// const pts = interp.getPoints(segments);
// console.log(pts);

// interp.getPoints(valuableSamplesNumber).forEach((point, sampleNum) => {
//   const currHeight = (point[1] * height) / minDecibels;
//   canvasDrawer.rect(sampleNum, currHeight, barWidth, height - currHeight);
// });

// for (let sampleNum = 1; sampleNum < width; sampleNum++) {
//   // Converting to logarithmic scale
//   const sampleNumPerWidth = sampleNum * (valuableSamplesNumber / width);
//   const sample = buffer[sampleNum];
//   const logIndex = toLog(sampleNumPerWidth, 1, valuableSamplesNumber);
//   const low = Math.floor(logIndex);
//   const high = Math.ceil(logIndex);
//   const lv = buffer[low];
//   const hv = buffer[high];
//   const w = (logIndex - low) / (high - low);
//   const value = lv + (hv - lv) * w;

//   if (sample === -Infinity || sample === 0) {
//     canvasDrawer.stroke(COLORS.accentPrimary100);
//     canvasDrawer.fill(COLORS.accentPrimary100);
//     return canvasDrawer.rect(sampleNum * barWidth, height - 1, barWidth, 1);
//   }
//   const currSampleDec =
//     (sampleToDecibel(Math.abs(value)) * height) / minDecibels;
//   canvasDrawer.rect(
//     sampleNum * barWidth,
//     currSampleDec,
//     barWidth,
//     height - currSampleDec
//   );
// }

// //Given a range, transforms a value from linear scale to log scale.
// var toLog = function (value, min, max) {
//   var exp = (value - min) / (max - min);
//   return min * Math.pow(max / min, exp);
// };

// //In this case i'm using a range from 1 to 20, you would use the size of your array. I'm incrementing 'i' by one each time, but you could also change that
// for (var i = 1; i < 20; i += 1) {
//   //I'm starting at 1 because 0 and logarithms dont get along
//   var logindex = toLog(i, 1, 19); //the index we want to sample

//   //As the logindex will probably be decimal, we need to interpolate (in this case linear interpolation)
//   var low = Math.floor(logindex);
//   var high = Math.ceil(logindex);
//   var lv = arr[low];
//   var hv = arr[high];
//   var w = (logindex - low) / (high - low);
//   var v = lv + (hv - lv) * w; //the interpolated value of the original array in the logindex index.
//   document.write(v + '<br/>'); //In your case you should draw the bar here or save it in an array for later.
// }

// buffer.forEach((sample, sampleNum) => {
//   if (sampleNum > 511) return;

//   if (sample === -Infinity || sample === 0) {
//     canvasDrawer.stroke(COLORS.accentPrimary100);
//     canvasDrawer.fill(COLORS.accentPrimary100);
//     return canvasDrawer.rect(sampleNum, height - 1, 1, 1);
//   }
//   const currSampleDec = (sampleToDecibel(Math.abs(sample)) * height) / 23;
//   canvasDrawer.rect(sampleNum, currSampleDec, 1, height - currSampleDec);
// });
