import { KeyObject } from "./types";
import synthAudioContext from "./synthAudioContext";

export const getHz = (note = "A", octave = 4): number => {
  const A4 = 440;
  let N = 0;
  switch (note) {
    case "A":
      N = 0;
      break;
    case "A#":
    case "Bb":
      N = 1;
      break;
    case "B":
      N = 2;
      break;
    case "C":
      N = 3;
      break;
    case "C#":
    case "Db":
      N = 4;
      break;
    case "D":
      N = 5;
      break;
    case "D#":
    case "Eb":
      N = 6;
      break;
    case "E":
      N = 7;
      break;
    case "F":
      N = 8;
      break;
    case "F#":
    case "Gb":
      N = 9;
      break;
    case "G":
      N = 10;
      break;
    case "G#":
    case "Ab":
      N = 11;
      break;
  }
  N += 12 * (octave - 4);
  return A4 * Math.pow(2, N / 12);
};

export const keys: KeyObject[] = [
  { key: "A", note: "A", octaveOffset: 0 },
  { key: "W", note: "A#", octaveOffset: 0 },
  { key: "S", note: "B", octaveOffset: 0 },
  { key: "D", note: "C", octaveOffset: 0 },
  { key: "R", note: "C#", octaveOffset: 0 },
  { key: "F", note: "D", octaveOffset: 0 },
  { key: "T", note: "D#", octaveOffset: 0 },
  { key: "G", note: "E", octaveOffset: 0 },
  { key: "H", note: "F", octaveOffset: 0 },
  { key: "U", note: "F#", octaveOffset: 0 },
  { key: "J", note: "G", octaveOffset: 0 },
  { key: "I", note: "G#", octaveOffset: 0 },
  { key: "K", note: "A", octaveOffset: 1 },
  { key: "O", note: "A#", octaveOffset: 1 },
  { key: "L", note: "B", octaveOffset: 1 },
  { key: "semicolon", note: "C", octaveOffset: 1 },
  { key: "left-bracket", note: "C#", octaveOffset: 1 },
  { key: "colon", note: "D", octaveOffset: 1 },
  { key: "right-bracket", note: "D#", octaveOffset: 1 },
  { key: "slash", note: "E", octaveOffset: 1 }
];

export function getSynthOsc(key: KeyObject): {osc: OscillatorNode, noise: AudioBufferSourceNode} {
  const { note, octaveOffset } = key;
  const osc = synthAudioContext.getOsc(note);
  const noise = synthAudioContext.getNoise(note);
  const noteGainNode = synthAudioContext.getGainNode(note);
  synthAudioContext.setAmpEnvelope(note);

  if (synthAudioContext.getIsNoise()) {
    noise.connect(noteGainNode);
  } else {
    osc.connect(noteGainNode);
  }

  const freq = getHz(note, (octaveOffset || 0) + synthAudioContext.octave);

  if (Number.isFinite(freq)) {
    osc.frequency.value = freq;
  }

  return {osc, noise};
}

export function selectWaveformRandomly(): OscillatorType {
  const waveforms = ["sawtooth", "sine", "square", "triangle"];
  const index: number = Math.round(Math.random() * waveforms.length - 1)
  return waveforms[index] as OscillatorType;
}

export function mapSpecialKeyToKeyboard(key: string): string {
  switch(key) {
    case "semicolon":
      return ";"
    case "left-bracket":
      return "[";
    case "right-bracket":
      return "]";
    case "colon":
      return "'";
    case "slash": 
      return "\\";
    default:
      return key;
  }
}

export function mapKeyEventToKey(key: string): string {
  switch(key) {
    case ";":
      return "semicolon";
    case "[":
      return "left-bracket";
    case "]":
      return "right-bracket";
    case "'":
      return "colon";
    case "\\": 
      return "slash";
    default:
      return key;
  }
}