import { useEffect, useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import Stack from "@mui/material/Stack";
import synthAudioContext from '../../synthAudioContext';
import { DEFAULT_OCTAVE } from '../../consts';
import { Typography } from '@mui/material';
import StyledToggleButtonGroup from '../StyledToggleButtonGroup';


export default function OctaveSelector() {
  const octaves = [1, 2, 3, 4];
  const [octave, setOctave] = useState(DEFAULT_OCTAVE);

  const changeOctave = (selectedOctave: number) => {
    setOctave(selectedOctave);
    synthAudioContext.octave = selectedOctave;
  }

  useEffect(() => {
    const isOctaveKey = (key: number) => 
      Number.isSafeInteger(key) && 0 <= key && key <= 4;
    
    const onKeyUp = (e: KeyboardEvent) => {
      const eventKey = Number(e.key);
      if (isOctaveKey(eventKey)) {
        changeOctave(eventKey);
      }
    }

    document.addEventListener("keyup", onKeyUp);
    
    return () => {
      document.removeEventListener("keyup", onKeyUp);
    }
  });

  const handleChange = (e: React.MouseEvent<HTMLElement>, selectedOctave: number) => {
    if (selectedOctave !== null) {
      changeOctave(selectedOctave);
    }
  }

  return (
    <Stack spacing={2} direction="row" sx={{ mb: 1, float: 'right' }}>
      <StyledToggleButtonGroup
        value={octave}
        exclusive
        size="small"
        onChange={handleChange}
      > 
        {octaves.map(oct => (
          <ToggleButton key={oct} value={oct} aria-label={`${oct}`}>
            <Typography 
              color="var(--white-50)"
              fontSize="12px"
              >
              {oct}
            </Typography>
          </ToggleButton>
        ))}
      </StyledToggleButtonGroup>
      <Typography>Octave</Typography>
    </Stack>
  );
}