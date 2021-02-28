import Box from 'components/Box';
import { useStoreActions, useStoreState } from 'global-state/hooks';
import React, { useEffect, useRef, useState } from 'react';
import { AudioController } from 'services/AudioController';
import { getWavBytes } from 'utils/audio-convertion';
import WaveSurfer from 'wavesurfer.js';

import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import { Container } from './parts';

interface Props {
  url: string;
}

const WAVEFORM_OPTIONS = {
  waveColor: 'white',
  progressColor: '#7033FF',
  cursorColor: '#EE249F',
  barWidth: 4,
  barRadius: 2,
  responsive: true,
  height: 130,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
  plugins: [
    TimelinePlugin.create({
      container: '#wave-timeline',
      timeInterval: 2,
      primaryColor: '#FFFFFF',
      secondaryColor: '#FFFFFF',
      primaryFontColor: '#FFFFFF',
      secondaryFontColor: '#FFFFFF',
      height: 10,
      notchPercentHeight: 50
    })
  ]
};

const createWaveformOptions = (
  ref: HTMLElement,
  context: AudioContext
): WaveSurfer.WaveSurferParams => ({
  container: ref,
  audioContext: context,
  ...WAVEFORM_OPTIONS
});

export const Waveform: React.FC<Props> = ({ url }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext>(new AudioContext());

  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
  const { isPlaying, controller, currTime } = useStoreState(
    (state) => state.audio
  );
  const { play, pause, stop, initAudioController } = useStoreActions(
    (actions) => actions.audio
  );

  const togglePlaying = () => {
    wavesurfer?.pause();
    if (isPlaying) wavesurfer?.play();
    if (!isPlaying) wavesurfer?.pause();
  };

  useEffect(() => {
    initAudioController({ url });
  }, [url]);

  useEffect(() => {
    togglePlaying();
  }, [isPlaying]);
  useEffect(() => {
    console.log(currTime);
    wavesurfer?.setCurrentTime(currTime);
    // if (isPlaying) wavesurfer?.pause();
  }, [currTime]);

  useEffect(() => {
    if (controller && controller.buffer && waveformRef && waveformRef.current) {
      audioContextRef.current.resume();
      const options = createWaveformOptions(
        waveformRef.current,
        audioContextRef.current
      );
      const currWavesurfer = WaveSurfer.create(options);

      // Float32Array samples
      const [left, right] = [
        controller.buffer.getChannelData(0),
        controller.buffer.getChannelData(1)
      ];

      // interleaved
      const interleaved = new Float32Array(left.length + right.length);
      for (let src = 0, dst = 0; src < left.length; src++, dst += 2) {
        interleaved[dst] = left[src];
        interleaved[dst + 1] = right[src];
      }

      // get WAV file bytes and audio params of your audio source
      const wavBytes = getWavBytes(interleaved.buffer, {
        isFloat: true, // floating point or 16-bit integer
        numChannels: 2,
        sampleRate: 48000
      });
      const wav = new Blob([wavBytes], { type: 'audio/wav' });
      currWavesurfer.loadBlob(wav);
      currWavesurfer.on('ready', function () {
        // https://wavesurfer-js.org/docs/methods.html
        // wavesurfer.current.play();
        // setPlay(true);

        if (currWavesurfer) {
          currWavesurfer.setVolume(0);
        }
        console.log('buffer');
        console.log((currWavesurfer as any).backend.buffer);

        setWavesurfer(currWavesurfer);
      });
      currWavesurfer.on('interaction', function () {
        setTimeout(() => {
          console.log(currWavesurfer.getCurrentTime());
          controller?.setTime(currWavesurfer.getCurrentTime());
          togglePlaying();
        }, 50);
      });

      return () => currWavesurfer?.destroy();
    }
  }, [controller]);

  return (
    <Box>
      <Box>
        <Container>
          <div id='waveform' ref={waveformRef} />
        </Container>
        <Box padding={'10px'}>
          <div id='wave-timeline' />
        </Box>
      </Box>

      <div onClick={() => play()}>play</div>
      <div onClick={() => stop()}>stop</div>
      <div onClick={() => pause()}>pause</div>
    </Box>
  );
};

export default Waveform;
