import { getSynthOsc, keys } from "../audtioUtils";
import { KeyObject } from '../types';

import Key from "../Key/Key";
import { NOTE_LENGTH } from "../consts";
import "./Keyboard.css";

const Keyboard = () => {
  const pressedNotes = new Map<KeyObject, OscillatorNode>();
  let playingNoise: AudioBufferSourceNode | null = null;

  const getNoteClassName = (note: string) => {
    if (note.includes("#"))
      return "black";
    else if (note.includes("C") || note.includes("F"))
      return "white"
    else 
      return "white offset"
  };

  const playKey = (key: KeyObject) => {
    const {osc, noise} = getSynthOsc(key);
    pressedNotes.set(key, osc);
    playingNoise = noise;

    const playingOsc = pressedNotes.get(key);
    if (playingOsc) {
      playingOsc.start();
    }
    if (playingNoise) {
      playingNoise.start();
    }
  };

  const stopKey = (key: KeyObject) => {
    const playingOsc = pressedNotes.get(key);

    if (playingOsc || playingNoise) {
      setTimeout(() => {
        playingOsc && playingOsc.stop();
        playingNoise && playingNoise.stop();
      }, NOTE_LENGTH * 1000);
      pressedNotes.delete(key);
      playingNoise = null;
    }
  }

  return (
    <div id="keyboard">
      {keys.map(keyObject => (
        <Key 
          key={keyObject.key} 
          note={keyObject} 
          playKey={playKey}
          stopKey={stopKey}
          className={getNoteClassName(keyObject.note)}
        />
        ))}
    </div>
  )
};

export default Keyboard;