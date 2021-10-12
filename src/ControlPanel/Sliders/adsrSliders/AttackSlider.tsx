import GenericSlider from "../../../HelperComponents/GenericSlider";
import synthAudioContext from "../../../synthAudioContext";
import { DEFAULT_ATTACK_TIME } from "../../../consts";

export default function AttackSlider() {

  const onAttackChange = (attackTime: number) => {
    synthAudioContext.setAttackTime(attackTime);
  };

  return (
    <GenericSlider 
      label="Attack" 
      min={0.01}
      max={0.4}
      step={0.01}
      initValue={DEFAULT_ATTACK_TIME} 
      onChangeHandler={onAttackChange}
    />
  )
}