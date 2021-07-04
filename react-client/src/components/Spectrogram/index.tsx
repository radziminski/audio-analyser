import React, { useRef, useEffect } from 'react';
import Box, { FlexBox } from '~/components/Box';
import { COLORS } from '~/styles/theme';
import Spectro from 'spectrogram';
import AudioService from '~/services/AudioService';
import { scale } from 'chroma-js';
import { Heading5 } from '../Text';

interface Props {
  height?: number;
}

const Spectrogram: React.FC<Props> = ({ height = 220 }) => {
  const container = useRef<HTMLDivElement | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvas.current) {
      const analyser = AudioService.createAnalyser();
      analyser.analyserNode.smoothingTimeConstant = 0;
      analyser.analyserNode.fftSize = 1024;

      const spectrogram = Spectro(canvas.current, {
        audio: {
          enable: false
        },
        colors: function (steps) {
          const colorScale = scale([
            COLORS.background20,
            COLORS.background50,
            COLORS.accentPrimary100,
            COLORS.accentSecondary100
          ]);

          return colorScale.colors(steps, 'hex');
        }
      });
      spectrogram.connectSource(analyser.analyserNode, AudioService.context);
      spectrogram.start();

      return () => {
        spectrogram.stop();
      };
    }
  }, []);

  return (
    <>
      <FlexBox flexDirection='column' flexShrink={0} flexGrow={0}>
        <Box marginBottom='0.8rem'>
          <Heading5 light>Spectrogram:</Heading5>
        </Box>
        <FlexBox
          width='100%'
          height={height}
          ref={container}
          borderRadius={14}
          background={COLORS.background20}
          overflow='hidden'
          justifyContent='center'
          alignItems='center'
          color='red'
        >
          <canvas ref={canvas} style={{ height: '100%', width: '100%' }} />
        </FlexBox>
      </FlexBox>
    </>
  );
};

export default Spectrogram;

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
// const toLog = function (value, min, max) {
//   const exp = (value - min) / (max - min);
//   return min * Math.pow(max / min, exp);
// };

// //In this case i'm using a range from 1 to 20, you would use the size of your array. I'm incrementing 'i' by one each time, but you could also change that
// for (const i = 1; i < 20; i += 1) {
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
