import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import synthAudioContext from '../../synthAudioContext';
import { Typography } from '@mui/material';
import StyledToggleButtonGroup from '../StyledToggleButtonGroup';

export default function WaveformSelector() {
  const waverforms = ["sine", "square", "triangle", "sawtooth", "random"];
  const [waveform, setWaveform] = useState("triangle");

  const onSelectWaveform = (selected: OscillatorType | "random") => {
    synthAudioContext.setWaveform(selected);
  }

  const handleChange = (e: React.MouseEvent<HTMLElement>, selectedWaveform: string) => {
    setWaveform(selectedWaveform);
    onSelectWaveform(selectedWaveform as OscillatorType | "random");
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
          <Typography 
            fontSize="12px" 
            color="var(--white-50)"
          >
            {wf}
          </Typography>
        </ToggleButton>
      ))}
    </StyledToggleButtonGroup>
  );
}