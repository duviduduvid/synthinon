import { useState } from "react";
import Container from "@mui/material/Container";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from "@mui/material/Typography";
import DelayFeedbackSlider from "./Sliders/DelayFeedbackSlider";
import DelayTimeSlider from "./Sliders/DelayTimeSlider";
import synthAudioContext from "../synthAudioContext";
import DelayVolume from "./Sliders/DelayVolume";

export default function DelayPanel() {

  const [enabled, setEnabled] = useState(false);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setEnabled(target.checked);
    if (target.checked) {
      synthAudioContext.enableDelay();
    } else {
      synthAudioContext.disableDelay();
    }
  }
  
  return (
    <Container sx={{ 
      flexGrow: 1,
      margin: 2,
      padding: 2,
      boxShadow: "0 0 50px var(--black-50) inset, 0 1px var(--keyboard-shadow) inset, 0 5px 15px var(--black-50)",
      backgroundColor: "var(--keyboard)",
      borderRadius: '1rem',
      color: 'var(--white-50)',
      width: '10%'
    }}>
      <Typography textAlign="center" padding="10px">Delay</Typography>
      <FormGroup>
      <FormControlLabel control={
        <Switch
          checked={enabled}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      } label="On" />
    </FormGroup>
      <DelayVolume disabled={!enabled} />
      <DelayTimeSlider disabled={!enabled} />
      <DelayFeedbackSlider disabled={!enabled} />
    </Container>
  );
}