import synthAudioContext from "../../../synthAudioContext";
import GenericSlider from "../../../HelperComponents/GenericSlider";
import { INIT_FREQ } from "../../../consts";

export default function FrequencySlider() {
  
  const linearValueToLog = (value: number) => {
    // value is between 100 - 10000
    var minp = 100;
    var maxp = 10000;
  
    // The result should be between 100 an 20000
    var minv = Math.log(100);
    var maxv = Math.log(20000);
  
    // calculate adjustment factor
    var scale = (maxv-minv) / (maxp-minp);
  
    return Math.exp(minv + scale*(value-minp));
  };

  const onFreqChange = (freq: number) => {
    synthAudioContext.setFilterFrequency(linearValueToLog(freq));
  };

  return (
    <GenericSlider 
      label="Frequency" 
      min={100}
      max={10000}
      step={50}
      initValue={INIT_FREQ} 
      onChangeHandler={onFreqChange}
    />
  )
}