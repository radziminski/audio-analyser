import WaveSurfer from 'wavesurfer.js';

export const WAVEFORM_OPTIONS = {
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

export class WaveformService {
  createWavesurfer(params: WaveSurfer.WaveSurferParams): WaveSurfer {
    return WaveSurfer.create({ ...WAVEFORM_OPTIONS, ...params });
  }
}

const WaveformServiceSingleton = new WaveformService();

export default WaveformServiceSingleton;
