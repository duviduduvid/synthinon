import { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import synthAudioContext from '../../synthAudioContext';

export default function NoiseToggler() {
  const [checked, setChecked] = useState(false);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(target.checked);
    synthAudioContext.toggleNoise();
  }

  return (
    <FormGroup>
      <FormControlLabel control={
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      } label="Noise" />
    </FormGroup>
  );
}