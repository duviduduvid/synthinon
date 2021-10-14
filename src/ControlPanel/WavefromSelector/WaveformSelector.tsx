import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import { Typography } from '@mui/material';
import StyledToggleButtonGroup from '../StyledToggleButtonGroup';
import waveforms from "../../images/waveforms.svg";

type waveformType = OscillatorType | "random";

type WavefromSelectorProps = {
  defaultWaveform? : waveformType;
  orientation?: "horizontal" | "vertical";
  setWaveformFn: (selected: OscillatorType | "random") => void;
};

export default function WaveformSelector({ 
  defaultWaveform = "triangle", 
  orientation = "vertical", 
  setWaveformFn 
}: WavefromSelectorProps) {

  const waverforms = ["sine", "triangle", "sawtooth", "square", "random"];
  const [waveform, setWaveform] = useState(defaultWaveform);

  const onSelectWaveform = (selected: waveformType) => {
    setWaveformFn(selected);
  }

  const handleChange = (e: React.MouseEvent<HTMLElement>, selectedWaveform: waveformType) => {
    if (selectedWaveform) {
      setWaveform(selectedWaveform);
      onSelectWaveform(selectedWaveform as OscillatorType | "random");
    }
  };

  return (
    <StyledToggleButtonGroup
      orientation={orientation}
      value={waveform}
      exclusive
      size="small"
      onChange={handleChange}
    >
      {waverforms.map((wf, index) => (
        <ToggleButton key={index} value={wf} aria-label={wf}>
          { 
            index === 4  
            ? 
            <Typography 
              fontSize="10" 
              color="var(--white-50)" 
              width="30px" 
              height="20px"
            >
              ??
            </Typography>
            : 
            <img 
              src={`${waveforms}#svgView(viewBox(0, ${index * 4}, 6, 4))`} 
              alt={waveform} 
              width="30px" 
              height="20px" 
            />
          }
        </ToggleButton>
      ))}
    </StyledToggleButtonGroup>
  );
}