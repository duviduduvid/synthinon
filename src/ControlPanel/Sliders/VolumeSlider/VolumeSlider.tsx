
import GenericSlider from "../../../HelperComponents/GenericSlider";
import { INIT_GAIN } from "../../../consts";
import synthAudioContext from "../../../synthAudioContext";

export default function VolumeSlider() {
  
  const onVolumeChange = (volume: number) => {
    synthAudioContext.setVolume(volume);
  };

  return (
    <GenericSlider 
      label="Volume" 
      min={0} 
      max={1} 
      step={0.1} 
      initValue={INIT_GAIN} 
      onChangeHandler={onVolumeChange}
    />
  );
}