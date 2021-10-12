import GenericSlider from "../../../HelperComponents/GenericSlider";
import synthAudioContext from "../../../synthAudioContext";

export default function PannerSlider() {

  const onPanningChange = (pan: number) => {
    synthAudioContext.setPanning(pan);
  };

  return (
    <GenericSlider 
      label="Panning" 
      min={-1}
      max={1} 
      step={0.1} 
      initValue={0} 
      onChangeHandler={onPanningChange}
    />
  )
}