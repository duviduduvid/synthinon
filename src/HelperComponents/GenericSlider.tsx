import { useState } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

type GenericSliderProps = {
  label: string;
  min: number;
  max: number;
  step: number;
  initValue: number;
  onChangeHandler: (value: number) => void;
  disabled?: boolean;
  valueDisplayFn?: (value: number) => string;
}

export default function GenericSlider({ 
  label, 
  min, 
  max, 
  step, 
  initValue, 
  onChangeHandler, 
  valueDisplayFn, 
  disabled 
}: GenericSliderProps) {
  
  const ariaLabelledBy = `${label.toLowerCase()}-slider`;
  const [value, setValue] = useState(initValue);

  const onChange = (e: Event, value: number | number[]) => {
    const newValue = Array.isArray(value) ? value[0] : value;
    setValue(newValue);
    onChangeHandler(newValue);
  }

  return (
    <Grid container spacing={2} alignItems='center'>
      <Grid item xs={1}>
        <Typography id={`${ariaLabelledBy}-value`} fontSize={12}>
          {valueDisplayFn ? valueDisplayFn(value) : value}
        </Typography>
      </Grid>
      <Grid item xs={9}> 
        <Slider
          aria-labelledby={ariaLabelledBy}
          value={value}
          onChange={onChange}
          step={step}
          min={min}
          max={max}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={2}>
        <Typography id={ariaLabelledBy}>
          {label}
        </Typography>
      </Grid>
    </Grid>
  );
}