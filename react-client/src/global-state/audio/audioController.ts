export interface AudioController {
  context: AudioContext;
  audioElement: HTMLAudioElement;
  buffer: AudioBuffer | null;
  isLoadingBuffer: boolean;
  bufferError: any;
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

export class AudioController implements AudioController {
  private constructor() {
    this.context = new AudioContext();
    this.buffer = null;
    this.analysers = [];

    this.isPlaying = false;
    this.currAnalyserId = 0;
  }

  static fromAudioElement(element: HTMLAudioElement): AudioController {
    const audioController = new AudioController();
    audioController.audioElement = element;
    audioController.isPlaying = !element.paused;

    audioController.sourceNode = audioController.context.createMediaElementSource(
      element
    );

    audioController.mixGainNode = audioController.context.createGain();
    audioController.masterGainNode = audioController.context.createGain();

    audioController.splitterNode = audioController.context.createChannelSplitter(
      2
    );

    audioController.sourceNode.connect(audioController.mixGainNode);
    audioController.mixGainNode.connect(audioController.splitterNode);
    audioController.mixGainNode.connect(audioController.masterGainNode);
    audioController.masterGainNode.connect(audioController.context.destination);

    return audioController;
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
}
