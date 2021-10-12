import GenericSlider from "../../../HelperComponents/GenericSlider";
import synthAudioContext from "../../../synthAudioContext";
import { DEFAULT_DECAY_TIME } from "../../../consts";

export default function DecaySlider() {

  const onDecayChange = (decayTime: number) => {
    synthAudioContext.setDecayTime(decayTime);
  };

  return (
    <GenericSlider 
      label="Decay" 
      min={0.01}
      max={1}
      step={0.01}
      initValue={DEFAULT_DECAY_TIME} 
      onChangeHandler={onDecayChange}
    />
  )
}