import GenericSlider from "../../HelperComponents/GenericSlider";
import synthAudioContext from "../../synthAudioContext";
import { DEFAULT_DELAY_FEEDBACK } from "../../consts";

type DelayFeedbackSliderProps = {
  disabled?: boolean;
};

export default function DelayFeedbackSlider({ disabled }: DelayFeedbackSliderProps) {
  const onDelayFeedbackChange = (feedback: number) => {
    synthAudioContext.setDelayFeedback(feedback);
  }

  return (
    <GenericSlider 
      label="Feedback" 
      disabled={disabled}
      min={0}
      max={1}
      step={0.05}
      initValue={DEFAULT_DELAY_FEEDBACK} 
      onChangeHandler={onDelayFeedbackChange}
    />
  )
}