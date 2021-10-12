import { DEFAULT_DELAY_TIME } from "../../consts";
import synthAudioContext from "../../synthAudioContext";
import GenericSlider from "../../HelperComponents/GenericSlider";

type DelayTimeSliderProps = {
  disabled?: boolean;
};

export default function DelayTimeSlider({ disabled }: DelayTimeSliderProps) {

  const onDelayTimeChange = (time: number) => {
    synthAudioContext.setDelayTime(time);
  }

  return (
    <GenericSlider 
      label="Duration" 
      disabled={disabled}
      min={0}
      max={3000}
      step={20}
      initValue={DEFAULT_DELAY_TIME * 1000} 
      onChangeHandler={onDelayTimeChange}
    />
  )
}