export interface AudioController {
  context: AudioContext;
  audioElement: HTMLAudioElement;
  buffer: AudioBuffer | null;
  isLoadingBuffer: boolean;
  bufferError: any;
  isPlaying: boolean;

  currSourceNode: AudioBufferSourceNode | null;
  gainControl: GainNode;
}

export class AudioController implements AudioController {
  private constructor() {
    this.context = new AudioContext();
    this.gainControl = this.context.createGain();
    this.gainControl.connect(this.context.destination);
    this.buffer = null;

    this.isPlaying = false;
    this.currSourceNode = null;
    this.context.suspend();
  }

  static fromAudioElement(element: HTMLAudioElement): AudioController {
    const audioController = new AudioController();
    audioController.audioElement = element;
    audioController.isPlaying = !element.paused;

    return audioController;
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

  async resetContext() {
    await this.context.close();
    this.context = new AudioContext();
    this.gainControl = this.context.createGain();
    this.gainControl.connect(this.context.destination);
    await this.context.suspend();
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
