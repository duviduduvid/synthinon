import { selectWaveformRandomly } from "./audioUtils";
import { 
  DEFAULT_ATTACK_TIME, 
  DEFAULT_DECAY_TIME, 
  DEFAULT_DELAY_FEEDBACK, 
  DEFAULT_DELAY_TIME, 
  DEFAULT_OCTAVE, 
  DEFAULT_RELEASE_TIME, 
  DEFAULT_SUSTAIN_TIME, 
  DEFAULT_WAVEFORM, 
  INIT_FREQ, 
  INIT_GAIN, 
  INIT_Q, 
  NOTE_LENGTH, 
  SUSTAINED_GAIN, 
  ZERO_GAIN 
} from "./consts";

class SynthAudioContext {
  private audioContext: AudioContext;
  private oscs: Map<String, OscillatorNode>;
  private gainNodes: Map<String, GainNode>;
  private noises: Map<String, AudioBufferSourceNode>;
  private panner: StereoPannerNode;
  private volume: number;
  private lowpassFilter: BiquadFilterNode;
  private delay: DelayNode;
  private delayFeedback: GainNode;
  private delayGain: GainNode;
  private attackTime: number;
  private decayTime: number;
  private sustainTime: number;
  private releaseTime: number;
  private waveform: OscillatorType | "random";
  private isNoiseOsc: boolean;
  private _octave: number;
  private master: GainNode;
  
  constructor() {
    this.audioContext = new window.AudioContext();
    this.oscs = new Map<String, OscillatorNode>();
    this.gainNodes = new Map<String, GainNode>();
    this.noises = new Map<String, AudioBufferSourceNode>();
    this.panner = new StereoPannerNode(this.audioContext, { pan: 0 });
    this.lowpassFilter = new BiquadFilterNode(this.audioContext, { type: "lowpass", frequency: INIT_FREQ, Q: INIT_Q});
    this.volume = INIT_GAIN;
    this.attackTime = DEFAULT_ATTACK_TIME;    
    this.decayTime = DEFAULT_DECAY_TIME;
    this.sustainTime = DEFAULT_SUSTAIN_TIME;
    this.releaseTime = DEFAULT_RELEASE_TIME;
    this.waveform = DEFAULT_WAVEFORM;
    this.isNoiseOsc = false;
    this._octave = DEFAULT_OCTAVE;
    [this.delay, this.delayFeedback, this.delayGain] = this.initDelayAndFeedback();
    this.master = this.initMasterGain(this.volume);
  }
  
  public get octave(): number {
    return this._octave;
  }
  public set octave(value: number) {
    this._octave = value;
  }

  private initDelayAndFeedback(): [DelayNode, GainNode, GainNode] {
    const delay = new DelayNode(this.audioContext, { delayTime: DEFAULT_DELAY_TIME, maxDelayTime: 2 });
    const feedback = this.audioContext.createGain();
    const delayGain = this.audioContext.createGain();
    feedback.gain.value = DEFAULT_DELAY_FEEDBACK;
    delayGain.gain.value = this.volume;
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(delayGain);

    return [delay, feedback, delayGain];
  }

  private initMasterGain(volume: number): GainNode {
    const master = this.audioContext.createGain();
    master.gain.value = volume;
    master.connect(this.audioContext.destination);
    return master;
  }

  private stopOsc(forNote: string, when = NOTE_LENGTH) {
    const currentOsc = this.oscs.get(forNote);
    if (currentOsc) {
      currentOsc.stop(this.audioContext.currentTime + when);
      this.oscs.delete(forNote)
    }
  }
  
  private stopNoise(forNote: string, when = NOTE_LENGTH) {
    const currentNoise = this.noises.get(forNote);
    if (currentNoise) {
      currentNoise.stop(this.audioContext.currentTime + when);
      this.noises.delete(forNote);
    }
  }

  public getOsc(forNote: string): OscillatorNode {
    this.stopOsc(forNote);
    const osc = this.audioContext.createOscillator();
    const waveform = this.waveform === "random" ? selectWaveformRandomly() : this.waveform;
    osc.type = waveform;
    this.oscs.set(forNote, osc);

    return osc;
  }

  public getGainNode(forNote: string): GainNode {
    if (this.gainNodes.get(forNote)) {
      this.gainNodes.delete(forNote);
    }
    const gainNode = this.audioContext.createGain();

    gainNode
      .connect(this.panner)
      .connect(this.lowpassFilter)
      .connect(this.master);
    gainNode
      .connect(this.lowpassFilter)
      .connect(this.delay);
    gainNode.gain.value = ZERO_GAIN;
    this.gainNodes.set(forNote, gainNode);

    return gainNode;
  }

  public getNoise(forNote: string): AudioBufferSourceNode {
    this.stopNoise(forNote);
    const bufferSize = this.audioContext.sampleRate * NOTE_LENGTH * NOTE_LENGTH;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    let data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2) - 1;
    }

    const noise = this.audioContext.createBufferSource();
    noise.buffer = buffer;
    this.noises.set(forNote, noise);
    return noise;
  }

  public getContext(): AudioContext {
    return this.audioContext;
  }

  public setAmpEnvelope(forNote: string) {
    this.setAttack(forNote);
    this.setDecay(forNote);
    this.setSustain(forNote);
    this.setRelease(forNote);
  }

  private setAttack(forNote: string) {
    const node = this.gainNodes.get(forNote);
    if (node) {
      node.gain.exponentialRampToValueAtTime(
        this.volume,
        this.audioContext.currentTime + this.attackTime
      );
    }
  }

  public setAttackTime(time: number) {
    if (Number.isFinite(time)) { 
      this.attackTime = time;
    }
  }

  private setDecay(forNote: string) {
    const node = this.gainNodes.get(forNote);
    if (node) {
      node.gain.exponentialRampToValueAtTime(
        SUSTAINED_GAIN,
        this.audioContext.currentTime + Math.min(this.decayTime, this.releaseTime)
      );
    }
  }

  public setDecayTime(time: number) {
    if (Number.isFinite(time)) { 
      this.decayTime = time;
    }
  }

  private setSustain(forNote: string) {
    const node = this.gainNodes.get(forNote);
    if (node) {
      node.gain.exponentialRampToValueAtTime(
        SUSTAINED_GAIN / 2,
        this.audioContext.currentTime + Math.min(this.sustainTime, this.releaseTime)
      );
    }
  }

  public setSustainTime(time: number) {
    if (Number.isFinite(time)) { 
      this.sustainTime = time + this.decayTime;
    }
  }

  private setRelease(forNote: string) {
    const node = this.gainNodes.get(forNote);
    if (node) {
      node.gain.exponentialRampToValueAtTime(
        ZERO_GAIN,
        this.audioContext.currentTime + this.releaseTime
      );
    }
  }

  public setReleaseTime(time: number) {
    if (Number.isFinite(time)) { 
      this.releaseTime = time;
    }
  }

  public setVolume(newVolume: number) {
    if (Number.isFinite(newVolume)) {
      this.volume = newVolume || ZERO_GAIN;
      this.master.gain.value = this.volume;
    }
  }

  public setPanning(newPan: number) {
    if (Number.isFinite(newPan)) {
      this.panner.pan.value = newPan;
    }
  }

  public setFilterFrequency(newFreq: number) {
    if (Number.isFinite(newFreq)) {
      this.lowpassFilter.frequency.value = newFreq;
    }
  }

  public setFilterQ(newQ: number) {
    if (Number.isFinite(newQ)) {
      this.lowpassFilter.Q.value = newQ;
    }
  }

  public setDelayTime(newTime: number) {
    if (Number.isFinite(newTime)) {
      this.delay.delayTime.value = newTime / 1000;
    }
  }

  public setDelayFeedback(newFeedback: number) {
    if (Number.isFinite(newFeedback)) {
      this.delayFeedback.gain.value = newFeedback;
    } 
  }

  public setWaveform(waveform: OscillatorType | "random") {
    this.waveform = waveform;
  }

  public toggleNoise() {
    this.isNoiseOsc = !this.isNoiseOsc;
  }

  public getIsNoise(): boolean {
    return this.isNoiseOsc;
  }

  public enableDelay() {
    this.delayGain.connect(this.master);
  }

  public disableDelay() {
    this.delayGain.disconnect(this.master);
  }

  public setDelayVolume(newVolume: number) {
    if (Number.isFinite(newVolume)) {
      this.delayGain.gain.value = newVolume;
    }
  }
}

const synthAudioContext = new SynthAudioContext();
export default synthAudioContext;