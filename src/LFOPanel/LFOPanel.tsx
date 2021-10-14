import { useState } from "react";
import Container from "@mui/material/Container";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import synthAudioContext from "../synthAudioContext";
import LFORateSlider from "./Sliders/LFORateSlider";
import WaveformSelector from "../ControlPanel/WavefromSelector/WaveformSelector";

export default function LFOPanel() {

  const [enabled, setEnabled] = useState(false);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setEnabled(target.checked);
    if (target.checked) {
      synthAudioContext.enableLfo();
    } else {
      synthAudioContext.disableLfo();
    }
  }

  return (    
    <Container sx={{ 
      margin: 1,
      padding: 2,
      boxShadow: "0 0 50px var(--black-50) inset, 0 1px var(--keyboard-shadow) inset, 0 5px 15px var(--black-50)",
      backgroundColor: "var(--keyboard)",
      borderRadius: '1rem',
      color: 'var(--white-50)',
      width: '50%'
    }}>
      <Typography textAlign="center" padding="10px">
        LFO
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FormGroup sx={{ mr: 10 }}>
          <FormControlLabel control={
            <Switch
              checked={enabled}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            } label="On" 
          />
        </FormGroup>
        <WaveformSelector 
          orientation="horizontal" 
          defaultWaveform="sine" 
          setWaveformFn={synthAudioContext.setLfoWaveform.bind(synthAudioContext)}
        />
      </div>
      <LFORateSlider disabled={!enabled}/>
    </Container>
  );
}