export interface AudioService {
  context: AudioContext;
  audioElement: HTMLAudioElement;
  buffer: AudioBuffer | null;
  isLoadingBuffer: boolean;
  bufferError: string;
  isPlaying: boolean;

  sourceNode: MediaElementAudioSourceNode;
  mixGainNode: GainNode;
  masterGainNode: GainNode;
  splitterNode: ChannelSplitterNode;
  analysers: Analyser[];
  currAnalyserId: number;
}

export interface Analyser {
  analyserNode: AnalyserNode;
  channel: 0 | 1;
  id: number;
}

export const LEFT_CHANNEL = 0;
export const RIGHT_CHANNEL = 1;

export class AudioService implements AudioService {
  constructor() {
    this.context = new AudioContext();
    this.buffer = null;
    this.analysers = [];

    this.isPlaying = false;
    this.currAnalyserId = 0;
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
  }

  static fromAudioElement(element: HTMLAudioElement): AudioService {
    const audioService = new AudioService();
    audioService.audioElement = element;
    audioService.isPlaying = !element.paused;

    audioService.sourceNode = audioService.context.createMediaElementSource(
      element
    );

    audioService.mixGainNode = audioService.context.createGain();
    audioService.masterGainNode = audioService.context.createGain();

    audioService.splitterNode = audioService.context.createChannelSplitter(2);

    audioService.sourceNode.connect(audioService.mixGainNode);
    audioService.mixGainNode.connect(audioService.splitterNode);
    audioService.mixGainNode.connect(audioService.masterGainNode);
    audioService.masterGainNode.connect(audioService.context.destination);

    return audioService;
  }

  createAnalyser(channel: 0 | 1 = 0): Analyser {
    const analyserNode = this.context.createAnalyser();
    this.splitterNode.connect(analyserNode, channel);

    const analyser: Analyser = {
      id: this.currAnalyserId++,
      analyserNode,
      channel
    };
    this.analysers.push(analyser);

    return analyser;
  }

  removeAnalyser(id: number): boolean {
    const analyser = this.analysers.find(
      (currAnalyser) => currAnalyser.id === id
    );
    if (!analyser) return false;

    this.splitterNode.disconnect(analyser.analyserNode, analyser.channel);
    analyser.analyserNode.disconnect();
    const analyserIndex = this.analysers.indexOf(analyser);
    if (analyserIndex > 0) this.analysers.splice(analyserIndex, 1);

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
    this.analysers.forEach((analyser) => this.removeAnalyser(analyser.id));

    this.sourceNode.disconnect(this.mixGainNode);
    this.mixGainNode.disconnect(this.splitterNode);
    this.mixGainNode.disconnect(this.masterGainNode);
    this.masterGainNode.disconnect(this.context.destination);
  }
}

const audioService = new AudioService();

export default audioService;
