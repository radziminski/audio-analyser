import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';

const WAVEFORM_OPTIONS: Omit<WaveSurfer.WaveSurferParams, 'container'> = {
  waveColor: 'white',
  progressColor: '#7033FF',
  cursorColor: '#EE249F',
  barMinHeight: 1,
  barWidth: 3,
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
