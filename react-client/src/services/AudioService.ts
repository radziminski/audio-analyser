import {
  MeydaAnalyzer,
  createMeydaAnalyzer,
  MeydaAudioFeature,
  MeydaFeaturesObject
} from 'meyda';

export interface AudioService {
  context: AudioContext;
  audioElement: HTMLAudioElement;
  buffer: AudioBuffer | null;
  isLoadingBuffer: boolean;
  bufferError: string;
  isPlaying: boolean;
  connected: boolean;
  microphoneAllowed: boolean;
  prevGain: number;
  isMicrophoneSetAsSource: boolean;

  sourceNode: MediaElementAudioSourceNode;
  microphoneSourceNode: MediaStreamAudioSourceNode;
  mixGainNode: GainNode;
  masterGainNode: GainNode;
  splitterNode: ChannelSplitterNode;
  analyzers: Analyser[];
  currAnalyserId: number;

  meydaAnalyzers: Record<number, MeydaAnalyserWithFeatures>;
}

export const LEFT_CHANNEL = 0;
export const RIGHT_CHANNEL = 1;

export type AudioChannel = 0 | 1;

export interface Analyser {
  analyserNode: AnalyserNode;
  channel: AudioChannel;
  id: number;
}

export interface MeydaAnalyserWithFeatures {
  analyzer: MeydaAnalyzer;
  features: MeydaAudioFeature[];
}

export const AudioContext =
  window.AudioContext || // Default
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).webkitAudioContext || // Safari and old versions of Chrome
  false;

export class AudioService implements AudioService {
  constructor() {
    this.context = new AudioContext();
    this.buffer = null;
    this.analyzers = [];
    this.prevGain = 1;

    this.isPlaying = false;
    this.currAnalyserId = 0;
    this.connected = false;
    this.meydaAnalyzers = {};
    this.isMicrophoneSetAsSource = false;
  }

  init(element: HTMLAudioElement) {
    this.audioElement = element;
    this.isPlaying = !element.paused;

    this.sourceNode = this.context.createMediaElementSource(element);

    this.mixGainNode = this.context.createGain();
    this.masterGainNode = this.context.createGain();

    this.splitterNode = this.context.createChannelSplitter(2);

    this.sourceNode.connect(this.mixGainNode);
    this.mixGainNode.connect(this.splitterNode);
    this.mixGainNode.connect(this.masterGainNode);
    this.masterGainNode.connect(this.context.destination);

    this.connected = true;
  }

  static fromAudioElement(element: HTMLAudioElement): AudioService {
    const audioService = new AudioService();
    audioService.audioElement = element;
    audioService.isPlaying = !element.paused;

    audioService.sourceNode =
      audioService.context.createMediaElementSource(element);

    audioService.mixGainNode = audioService.context.createGain();
    audioService.masterGainNode = audioService.context.createGain();

    audioService.splitterNode = audioService.context.createChannelSplitter(2);

    audioService.sourceNode.connect(audioService.mixGainNode);
    audioService.mixGainNode.connect(audioService.splitterNode);
    audioService.mixGainNode.connect(audioService.masterGainNode);
    audioService.masterGainNode.connect(audioService.context.destination);

    return audioService;
  }

  switchAnalyserToMicrophone() {
    console.log('switchng to micro while', this.isMicrophoneSetAsSource);
    if (this.isMicrophoneSetAsSource) return;

    this.sourceNode.disconnect();
    this.prevGain = this.masterGainNode.gain.value;
    this.masterGainNode.gain.value = 0;

    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { audio: true },
        (stream) => {
          this.microphoneSourceNode =
            this.context.createMediaStreamSource(stream);
          this.microphoneSourceNode.connect(this.mixGainNode);
          this.isMicrophoneSetAsSource = true;
        },
        () => {
          this.microphoneAllowed = false;
        }
      );
    }
  }

  switchAnalyserToAudioElement() {
    console.log('switchng to audio while', this.isMicrophoneSetAsSource);

    if (!this.isMicrophoneSetAsSource) return;

    this.isMicrophoneSetAsSource = false;
    this.microphoneSourceNode?.disconnect();
    this.masterGainNode.gain.value = this.prevGain ?? 1;
    this.sourceNode?.connect(this.mixGainNode);
  }

  createAnalyser(channel: 0 | 1 = 0): Analyser {
    const analyserNode = this.context.createAnalyser();
    this.splitterNode.connect(analyserNode, channel);

    const analyser: Analyser = {
      id: this.currAnalyserId++,
      analyserNode,
      channel
    };
    this.analyzers.push(analyser);

    return analyser;
  }

  removeAnalyser(id: number): boolean {
    const analyser = this.analyzers.find(
      (currAnalyser) => currAnalyser.id === id
    );
    if (!analyser) return false;

    this.splitterNode.disconnect(analyser.analyserNode, analyser.channel);
    analyser.analyserNode.disconnect();
    const analyserIndex = this.analyzers.indexOf(analyser);
    if (analyserIndex > 0) this.analyzers.splice(analyserIndex, 1);

    return true;
  }

  async loadBuffer(): Promise<AudioBuffer | null> {
    this.isLoadingBuffer = true;
    try {
      const response = await fetch(this.audioElement.src);
      const arrayBuffer = await response.arrayBuffer();
      const decodedAudio = await this.context.decodeAudioData(arrayBuffer);
      this.setBuffer(decodedAudio);
      return decodedAudio;
    } catch (error) {
      this.bufferError = error;
    } finally {
      this.isLoadingBuffer = false;
    }
    return null;
  }

  setBuffer(buffer: AudioBuffer) {
    this.buffer = buffer;
  }

  areFeaturesIncluded(
    features: MeydaAudioFeature[],
    allFeatures: MeydaAudioFeature[]
  ) {
    return features.every((feature) => allFeatures.includes(feature));
  }

  getDefaultMeydaFeatures(bufferSize = 2048) {
    const num = 0;
    const floatArr = new Float32Array(bufferSize).fill(num);
    const numArr = new Array(bufferSize).fill(num);

    return {
      amplitudeSpectrum: floatArr,
      buffer: numArr,
      chroma: numArr,
      complexSpectrum: {
        real: numArr,
        imag: numArr
      },
      energy: numArr,
      loudness: {
        specific: floatArr,
        total: numArr
      },
      mfcc: numArr,
      perceptualSharpness: numArr,
      perceptualSpread: numArr,
      powerSpectrum: floatArr,
      rms: numArr,
      spectralCentroid: numArr,
      spectralFlatness: numArr,
      spectralKurtosis: numArr,
      spectralRolloff: numArr,
      spectralSkewness: numArr,
      spectralSlope: numArr,
      spectralSpread: numArr,
      zcr: numArr
    };
  }

  getMeydaFeatures(bufferSize = 2048, feature: MeydaAudioFeature) {
    const defaultFeatures = this.getDefaultMeydaFeatures(bufferSize);
    let neededFeatures = new Set<MeydaAudioFeature>([feature]);
    if (this.meydaAnalyzers[bufferSize]) {
      if (
        this.areFeaturesIncluded(
          [feature],
          this.meydaAnalyzers[bufferSize].features
        )
      ) {
        const values = this.meydaAnalyzers[bufferSize].analyzer.get();
        return values ? values[feature] : defaultFeatures[feature];
      }

      neededFeatures = new Set([
        feature,
        ...this.meydaAnalyzers[bufferSize].features
      ]);

      this.meydaAnalyzers[bufferSize].analyzer.stop();
      delete this.meydaAnalyzers[bufferSize];
    }

    const neededFeaturesArr = Array.from(neededFeatures);
    const analyzer = createMeydaAnalyzer({
      audioContext: this.context,
      source: this.mixGainNode,
      bufferSize,
      featureExtractors: neededFeaturesArr
    });

    this.meydaAnalyzers[bufferSize] = {
      analyzer,
      features: neededFeaturesArr
    };

    this.meydaAnalyzers[bufferSize].analyzer.start();

    const values = this.meydaAnalyzers[bufferSize].analyzer.get();

    return values ? values[feature] : defaultFeatures[feature];
  }

  clearMeydaAnalyzers() {
    Object.values(this.meydaAnalyzers).forEach((analyzer) =>
      analyzer.analyzer.stop()
    );

    this.meydaAnalyzers = {};
  }

  createMeydaAnalyzer(
    bufferSize = 2048,
    features: MeydaAudioFeature[],
    callback: (features: Partial<MeydaFeaturesObject>) => void
  ) {
    const analyzer = createMeydaAnalyzer({
      audioContext: this.context,
      source: this.mixGainNode,
      bufferSize,
      featureExtractors: features,
      callback
    });

    this.meydaAnalyzers[bufferSize] = { analyzer, features };

    analyzer.start();

    return analyzer;
  }

  play() {
    this.audioElement.play();
    this.isPlaying = true;
  }

  async stop() {
    this.audioElement.pause();
    this.audioElement.currentTime = 0;
    this.isPlaying = false;
  }

  async pause() {
    this.audioElement.pause();
    this.isPlaying = false;
  }

  async setTime(time: number) {
    this.audioElement.currentTime = time;
  }

  reloadAudio(src: string) {
    this.audioElement.src = src;
    this.audioElement.load();
  }

  remove() {
    if (this.connected) {
      this.analyzers.forEach((analyser) => this.removeAnalyser(analyser.id));

      this.sourceNode.disconnect(this.mixGainNode);
      this.mixGainNode.disconnect(this.splitterNode);
      this.mixGainNode.disconnect(this.masterGainNode);
      this.masterGainNode.disconnect(this.context.destination);
    }
  }

  clear() {
    this.clearMeydaAnalyzers();
    this.stop();
    this.reloadAudio('');
  }
}

const audioService = new AudioService();

export default audioService;
