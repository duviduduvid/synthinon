import synthAudioContext from "../../../synthAudioContext";
import GenericSlider from "../../../HelperComponents/GenericSlider";
import { INIT_FREQ, MAX_FREQ, MIN_FREQ } from "../../../consts";
import { toLogValue } from "../../../audioUtils";

export default function FrequencySlider() {

  const onFreqChange = (freq: number) => {
    synthAudioContext.setFilterFrequency(toLogValue(freq, MIN_FREQ, MAX_FREQ));
  };

  const getFreqDisplay = (freq: number): string => 
    freq < 10000 ? String(freq) : String(`${(freq / 1000).toFixed(1)}K`);

  return (
    <GenericSlider 
      label="Frequency" 
      min={MIN_FREQ}
      max={MAX_FREQ}
      step={50}
      initValue={INIT_FREQ} 
      onChangeHandler={onFreqChange}
      valueDisplayFn={getFreqDisplay}
    />
  )
}