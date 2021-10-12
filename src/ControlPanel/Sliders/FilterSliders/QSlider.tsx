import synthAudioContext from "../../../synthAudioContext";
import GenericSlider from "../../../HelperComponents/GenericSlider";
import { INIT_Q } from "../../../consts";

export default function QSlider() {

  const onQChange = (q: number) => {
    synthAudioContext.setFilterQ(q);
  }

  return (
    <GenericSlider 
      label="Resonance" 
      min={0}
      max={15}
      step={0.5}
      initValue={INIT_Q} 
      onChangeHandler={onQChange}
    />
  )
}