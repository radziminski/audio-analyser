import Box from 'components/Box';
import { useStoreActions, useStoreState } from 'global-state/hooks';
import React, { useEffect, useRef, useState } from 'react';
import { AudioController } from 'services/AudioController';
import WaveSurfer from 'wavesurfer.js';

interface Props {
  url: string;
}

const WAVEFORM_OPTIONS = {
  waveColor: 'white',
  progressColor: '#7033FF',
  cursorColor: '#7033FF',
  barWidth: 3,
  barRadius: 2,
  responsive: true,
  height: 150,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true
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
      <div id='waveform' ref={waveformRef} />
      <div onClick={() => play()}>play</div>
      <div onClick={() => stop()}>stop</div>
      <div onClick={() => pause()}>pause</div>
    </Box>
  );
};

export default Waveform;

// Returns Uint8Array of WAV bytes
function getWavBytes(buffer: any, options: any) {
  const type = options.isFloat ? Float32Array : Uint16Array;
  const numFrames = buffer.byteLength / type.BYTES_PER_ELEMENT;

  const headerBytes = getWavHeader(Object.assign({}, options, { numFrames }));
  const wavBytes = new Uint8Array(headerBytes.length + buffer.byteLength);

  // prepend header, then add pcmBytes
  wavBytes.set(headerBytes, 0);
  wavBytes.set(new Uint8Array(buffer), headerBytes.length);

  return wavBytes;
}

// adapted from https://gist.github.com/also/900023
// returns Uint8Array of WAV header bytes
function getWavHeader(options: any) {
  const numFrames = options.numFrames;
  const numChannels = options.numChannels || 2;
  const sampleRate = options.sampleRate || 44100;
  const bytesPerSample = options.isFloat ? 4 : 2;
  const format = options.isFloat ? 3 : 1;

  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numFrames * blockAlign;

  const buffer = new ArrayBuffer(44);
  const dv = new DataView(buffer);

  let p = 0;

  function writeString(s: any) {
    for (let i = 0; i < s.length; i++) {
      dv.setUint8(p + i, s.charCodeAt(i));
    }
    p += s.length;
  }

  function writeUint32(d: any) {
    dv.setUint32(p, d, true);
    p += 4;
  }

  function writeUint16(d: any) {
    dv.setUint16(p, d, true);
    p += 2;
  }

  writeString('RIFF'); // ChunkID
  writeUint32(dataSize + 36); // ChunkSize
  writeString('WAVE'); // Format
  writeString('fmt '); // Subchunk1ID
  writeUint32(16); // Subchunk1Size
  writeUint16(format); // AudioFormat
  writeUint16(numChannels); // NumChannels
  writeUint32(sampleRate); // SampleRate
  writeUint32(byteRate); // ByteRate
  writeUint16(blockAlign); // BlockAlign
  writeUint16(bytesPerSample * 8); // BitsPerSample
  writeString('data'); // Subchunk2ID
  writeUint32(dataSize); // Subchunk2Size

  return new Uint8Array(buffer);
}
