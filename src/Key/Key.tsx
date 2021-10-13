import { useState, useEffect } from "react";
import { mapKeyEventToKey, mapSpecialKeyToKeyboard } from "../audioUtils";
import { KeyObject, ClassName} from "../types";
import "./Key.css";

type KeyProps = {
  note: KeyObject;
  playKey: (key: KeyObject) => void;
  stopKey: (key: KeyObject) => void;
  className: ClassName;
};
 
const Key = ({ note, playKey, stopKey, className } : KeyProps) => {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const eventKey = e.key.toUpperCase();
      const key = mapKeyEventToKey(eventKey);

      if (key === note.key) {
        setIsPressed(true);
      }
    }

    const onKeyUp = (e: KeyboardEvent) => {
      const eventKey = e.key.toUpperCase();
      const key = mapKeyEventToKey(eventKey);
      
      if (key === note.key ) {
        setIsPressed(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    }
  }, [note.key]); 

  useEffect(() => {
    if (isPressed) {
      playKey(note);
    } else {
      stopKey(note);
    }
  }, [note, playKey, stopKey, isPressed]);

  const getClassName = (className: ClassName): string =>
    `${isPressed ? className + " pressed" : className}`;

  return (
    <div 
      onMouseDown={() => setIsPressed(true)} 
      onMouseUp={() => setIsPressed(false)} 
      className={getClassName(className)}
    >
      <span className="key-label">
        <span><i className="key-name">({mapSpecialKeyToKeyboard(note.key)})</i></span>
        <span className="note.name">{note.note}</span>
      </span>
    </div>
  )
};

export default Key;

