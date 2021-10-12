import { INIT_GAIN } from "../../consts";
import GenericSlider from "../../HelperComponents/GenericSlider";
import synthAudioContext from "../../synthAudioContext";

type DelayVolumeProps = {
  disabled?: boolean;
};

export default function DelayVolume({ disabled }: DelayVolumeProps) {

  const onDelayVolumeChange = (volume: number) => {
    synthAudioContext.setDelayVolume(volume);
  }

  return (
    <GenericSlider 
      label="Volume" 
      disabled={disabled}
      min={0}
      max={0.95}
      step={0.05}
      initValue={INIT_GAIN} 
      onChangeHandler={onDelayVolumeChange}
    />
  )
}