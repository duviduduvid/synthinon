import GenericSlider from "../../../HelperComponents/GenericSlider";
import synthAudioContext from "../../../synthAudioContext";
import { DEFAULT_RELEASE_TIME } from "../../../consts";

export default function ReleaseSlider() {

  const onReleaseChange = (releaseTime: number) => {
    synthAudioContext.setReleaseTime(releaseTime);
  };

  return (
    <GenericSlider 
      label="Release" 
      min={0.1}
      max={2}
      step={0.1}
      initValue={DEFAULT_RELEASE_TIME} 
      onChangeHandler={onReleaseChange}
    />
  )
}