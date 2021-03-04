export {};
// import Box from 'components/Box';
// import Waveform from 'components/Waveform';
// import { useStoreActions, useStoreState } from 'global-state/hooks';
// import React, { useEffect, useRef, useState } from 'react';
// import { getWavBytes } from 'utils/audio-convertion';
// import WaveSurfer from 'wavesurfer.js';

// import { Container } from './parts';

// interface Props {
//   url: string;
//   audioElement: HTMLAudioElement;
// }

// export const Waveform: React.FC<Props> = ({ url, audioElement }) => {
//   const waveformRef = useRef<HTMLDivElement>(null);
//   const audioRef = useRef<HTMLAudioElement | null>(null);

//   const { controller, currTime } = useStoreState((state) => state.audio);
//   const { play, pause, stop, initController } = useStoreActions(
//     (actions) => actions.audio
//   );

//   useEffect(() => {
//     if (audioRef.current) initController(audioRef.current);
//   }, [audioRef]);

//   // useEffect(() => {
//   //   if (controller && controller.buffer && waveformRef && waveformRef.current) {
//   //     audioContextRef.current.resume();
//   //     const options = createWaveformOptions(
//   //       waveformRef.current,
//   //       audioContextRef.current
//   //     );
//   //     const currWavesurfer = WaveSurfer.create(options);

//   //     // Float32Array samples
//   //     const [left, right] = [
//   //       controller.buffer.getChannelData(0),
//   //       controller.buffer.getChannelData(1)
//   //     ];

//   //     // interleaved
//   //     const interleaved = new Float32Array(left.length + right.length);
//   //     for (let src = 0, dst = 0; src < left.length; src++, dst += 2) {
//   //       interleaved[dst] = left[src];
//   //       interleaved[dst + 1] = right[src];
//   //     }

//   //     // get WAV file bytes and audio params of your audio source
//   //     const wavBytes = getWavBytes(interleaved.buffer, {
//   //       isFloat: true, // floating point or 16-bit integer
//   //       numChannels: 2,
//   //       sampleRate: 48000
//   //     });
//   //     const wav = new Blob([wavBytes], { type: 'audio/wav' });
//   //     currWavesurfer.loadBlob(wav);
//   //     currWavesurfer.on('ready', function () {
//   //       // https://wavesurfer-js.org/docs/methods.html
//   //       // wavesurfer.current.play();
//   //       // setPlay(true);

//   //       if (currWavesurfer) {
//   //         currWavesurfer.setVolume(0);
//   //       }
//   //       console.log('buffer');
//   //       console.log((currWavesurfer as any).backend.buffer);

//   //       setWavesurfer(currWavesurfer);
//   //     });
//   //     currWavesurfer.on('interaction', function () {
//   //       setTimeout(() => {
//   //         console.log(currWavesurfer.getCurrentTime());
//   //         controller?.setTime(currWavesurfer.getCurrentTime());
//   //         togglePlaying();
//   //       }, 50);
//   //     });

//   //     return () => currWavesurfer?.destroy();
//   //   }
//   // }, [controller]);

//   return (
//     <Box marginBottom={40}>
//       {/* <Box>
//         <Container>
//           <div id='waveform' ref={waveformRef} />
//         </Container>
//         <Box padding={'10px'}>
//           <div id='wave-timeline' />
//         </Box>
//       </Box> */}
//       <audio src={require('assets/sample.wav')} ref={audioRef} />
//       {/* <Waveform
//         buffer={(controller as any)?.backend?.buffer ?? []}
//         barMinHeight={1}
//         barWidth={4}
//         barSpacing={1}
//         height={150}
//         barBorderRadius={8}
//         audioElement={audioElement}
//       /> */}
//     </Box>
//   );
// };

// export default Waveform;
