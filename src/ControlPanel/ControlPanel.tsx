import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AttackSlider from "./Sliders/adsrSliders/AttackSlider"
import DecaySlider from "./Sliders/adsrSliders/DecaySlider";
import SustainSlider from "./Sliders/adsrSliders/SustainSlider";
import ReleaseSlider from "./Sliders/adsrSliders/ReleaseSlider";
import PannerSlider from "./Sliders/PannerSlider/PannerSlider";
import VolumeSlider from "./Sliders/VolumeSlider/VolumeSlider";
import FrequencySlider from "./Sliders/FilterSliders/FrequencySlider";
import QSlider from "./Sliders/FilterSliders/QSlider";
import WaveformSelector from './WavefromSelector/WaveformSelector';
import NoiseToggler from "./NoiseToggler/NoiseToggler";
import OctaveSelector from './OctaveSelector/OctaveSelector';
import synthAudioContext from '../synthAudioContext';

const ControlPanel = () => (
  <Grid container spacing={1} sx={{ 
      flexGrow: 1,
      margin: 2,
      padding: 2,
      boxShadow: "0 0 50px var(--black-50) inset, 0 1px var(--keyboard-shadow) inset, 0 5px 15px var(--black-50)",
      backgroundColor: "var(--keyboard)",
      borderRadius: '1rem',
      color: 'var(--white-50)',
      height: '50%',
      width: '88%',
    }}>
    <Grid item xs={12} paddingBottom="12px">
      <Typography textAlign="center">Control Panel</Typography>
    </Grid>
    <Grid item xs={5}>
      <VolumeSlider />
      <PannerSlider />
      <FrequencySlider />
      <QSlider />
      <NoiseToggler />
    </Grid>
    <Grid item xs={2} sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <WaveformSelector setWaveformFn={synthAudioContext.setWaveform.bind(synthAudioContext)}/>
    </Grid>
    <Grid item xs={5}>
      <AttackSlider />
      <DecaySlider />
      <SustainSlider />
      <ReleaseSlider />
      <OctaveSelector />
    </Grid>
  </Grid>
);

export default ControlPanel;