import GenericSlider from "../../../HelperComponents/GenericSlider";
import synthAudioContext from "../../../synthAudioContext";
import { DEFAULT_SUSTAIN_TIME } from "../../../consts";

export default function SustainSlider() {

  const onSustainChange = (sustainTime: number) => {
    synthAudioContext.setSustainTime(sustainTime);
  };

  return (
    <GenericSlider 
      label="Sustain" 
      min={0.1}
      max={1.5}
      step={0.1}
      initValue={DEFAULT_SUSTAIN_TIME} 
      onChangeHandler={onSustainChange}
    />
  )
}