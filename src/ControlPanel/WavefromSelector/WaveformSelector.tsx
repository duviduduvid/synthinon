import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import synthAudioContext from '../../synthAudioContext';
import { Typography } from '@mui/material';
import StyledToggleButtonGroup from '../StyledToggleButtonGroup';
import waveforms from "../../images/waveforms.svg";

export default function WaveformSelector() {
  const waverforms = ["sine", "triangle", "sawtooth", "square", "random"];
  const [waveform, setWaveform] = useState("triangle");

  const onSelectWaveform = (selected: OscillatorType | "random") => {
    synthAudioContext.setWaveform(selected);
  }

  const handleChange = (e: React.MouseEvent<HTMLElement>, selectedWaveform: string) => {
    if (selectedWaveform) {
      setWaveform(selectedWaveform);
      onSelectWaveform(selectedWaveform as OscillatorType | "random");
    }
  };

  return (
    <StyledToggleButtonGroup
      orientation="vertical"
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