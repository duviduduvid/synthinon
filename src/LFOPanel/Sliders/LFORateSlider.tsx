import { DEFAULT_LFO_RATE } from "../../consts";
import GenericSlider from "../../HelperComponents/GenericSlider";
import synthAudioContext from "../../synthAudioContext";

type LFORateProps = {
  disabled?: boolean;
};

export default function LFORateSlider({ disabled }: LFORateProps) {
  const onLFORateChange = (rate: number) => {
    synthAudioContext.setLfoRate(rate);
  }

  return (
    <GenericSlider 
      label="Rate" 
      disabled={disabled}
      min={1}
      max={50}
      step={1}
      initValue={DEFAULT_LFO_RATE} 
      onChangeHandler={onLFORateChange}
    />
  )
}