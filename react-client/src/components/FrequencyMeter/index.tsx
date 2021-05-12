import AudioService from 'services/AudioControllerService';
import React, { useEffect, useRef } from 'react';
import Box, { FlexBox } from 'components/Box';
import { useCanvasDrawer, useAnimationFrameLoop } from 'hooks';
import { COLORS } from 'styles/theme';
import { getLabelsLocations, getLogValue, printLabel } from './helpers';
import Text from 'components/Text';
// import audioService from 'global-state/audio/audioController';

const barWidth = 1;
const minDecibels = 21;
const height = 220;
const width = 512;

const fftSize = 1024 * 8;

const FrequencyMeter: React.FC = () => {
  const analyser = useRef<AnalyserNode>();
  const container = useRef<HTMLDivElement | null>(null);
  const { canvasDrawer, ready } = useCanvasDrawer(container);
  const valuableSamplesNumber = (analyser.current?.fftSize || 0) / 2;

  const sampleRate = AudioService.buffer?.sampleRate;

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
          minDecibels,
          fftSize / 2
        )
      );
    }

    samplesInLog.slice(0, width - 2).forEach((point, sampleNum) => {
      const currHeight = point;
      canvasDrawer.stroke(COLORS.accentPrimary100);

      // TODO: fix this, hack for line at the begining
      if (currHeight < 50)
        canvasDrawer.rect(sampleNum, currHeight, barWidth, 0);
      else
        canvasDrawer.rect(sampleNum, currHeight, barWidth, height - currHeight);
    });
  };

  useAnimationFrameLoop(
    getFreq,
    ready && !!analyser.current && !!container.current
  );

  useEffect(() => {
    const currAnalyser = AudioService.createAnalyser();
    currAnalyser.analyserNode.fftSize = fftSize;
    analyser.current = currAnalyser.analyserNode;
    analyser.current.smoothingTimeConstant = 0.9;
  }, []);

  const labelLocations = getLabelsLocations(width, sampleRate || 0);

  return (
    <>
      {/* <button
        onClick={() => console.log(AudioService.audioElement.currentTime)}
      >
        GET FREQ
      </button> */}
      <FlexBox flexDirection='column' paddingX={20} flexShrink={0} flexGrow={0}>
        <Box
          width={width}
          height={height}
          ref={container}
          borderRadius={14}
          background={COLORS.background20}
          overflow='hidden'
        />
        <Box height={40} position='relative' overflow='hidden' width='100%'>
          {Object.keys(labelLocations).map((key) => (
            <FlexBox
              flexDirection='column'
              position='absolute'
              top={0}
              left={`${labelLocations[key] - 5}px`}
              alignItems='center'
              width='1px'
              key={key}
              opacity={labelLocations[key] > 1 ? 1 : 0}
              height={40}
            >
              <Box
                width='1px'
                height={6}
                background={COLORS.white}
                opacity={0.6}
                marginBottom='4px'
                marginTop='2px'
              />
              <Text fontSize='10px' color='white'>
                {printLabel(key)}
              </Text>
            </FlexBox>
          ))}
        </Box>
      </FlexBox>
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
