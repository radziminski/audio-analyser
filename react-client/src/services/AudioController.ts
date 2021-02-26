import { off } from 'process';

export interface AudioController {
  context: AudioContext;
  buffer: AudioBuffer | null;
  currTime: number;
  currOffset: number;
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
    this.currTime = 0;
    this.currOffset = 0;
    this.isPlaying = false;
    this.currSourceNode = null;
    this.context.suspend();
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
    if (this.currSourceNode && this.isPlaying) return;
    this.context.resume();
    this.currSourceNode = this.context.createBufferSource();
    this.currSourceNode.buffer = this.buffer;
    this.currSourceNode.connect(this.gainControl);

    this.currSourceNode.start(0, this.context.currentTime + this.currOffset);
    this.isPlaying = true;
  }

  async stop() {
    this.currSourceNode?.stop();
    this.currTime = 0;
    this.currOffset = 0;
    await this.resetContext();
    this.isPlaying = false;
  }

  async pause() {
    this.currSourceNode?.stop();
    this.currTime = this.context.currentTime + this.currOffset;
    await this.context.suspend();
    this.isPlaying = false;
  }

  async setTime(offset: number) {
    const wasPlaying = this.isPlaying;
    await this.stop();
    this.currOffset = offset;
    if (wasPlaying) this.play();
  }

  static async fromUrl(url: string): Promise<AudioController> {
    const audioController = new AudioController();

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const decodedAudio = await audioController.context.decodeAudioData(
      arrayBuffer
    );
    audioController.setBuffer(decodedAudio);

    return audioController;
  }
}
