import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';

import { COLORS } from './../styles/theme';

const WAVEFORM_OPTIONS: Omit<WaveSurfer.WaveSurferParams, 'container'> = {
  waveColor: 'white',
  progressColor: COLORS.secondary100,
  cursorColor: COLORS.accentSecondary100,
  barMinHeight: 1,
  barWidth: 5,
  barRadius: 2,
  responsive: true,
  height: 100,
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
      height: 12,
      notchPercentHeight: 30
    })
  ]
};

export const createWaveformOptions = (
  ref: HTMLElement,
  context: AudioContext
): WaveSurfer.WaveSurferParams => ({
  container: ref,
  audioContext: context,
  ...WAVEFORM_OPTIONS
});

export class WavesurferService {
  create(params: WaveSurfer.WaveSurferParams): WaveSurfer {
    return WaveSurfer.create({ ...WAVEFORM_OPTIONS, ...params });
  }
}

const WaveformServiceSingleton = new WavesurferService();

export default WaveformServiceSingleton;
