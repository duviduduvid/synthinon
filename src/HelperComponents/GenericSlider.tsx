import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

type GenericSliderProps = {
  label: string;
  min: number;
  max: number;
  step: number;
  initValue: number;
  onChangeHandler: (volume: number) => void;
  disabled?: boolean;
}

export default function GenericSlider({ label, min, max, step, initValue, onChangeHandler, disabled }: GenericSliderProps) {
  const ariaLabelledBy = `${label.toLowerCase()}-slider`;
  const [value, setValue] = useState(initValue);

  const onChange = (e: Event, value: number | number[]) => {
    const newValue = Array.isArray(value) ? value[0] : value;
    setValue(newValue);
    onChangeHandler(newValue);
  }

  return (
    <Stack spacing={2} direction="row" sx={{ mb: 1 }}>
      <Slider
        aria-labelledby={ariaLabelledBy}
        value={value}
        onChange={onChange}
        step={step}
        min={min}
        max={max}
        disabled={disabled}
      />
      <Typography id={ariaLabelledBy}>
        {label}
      </Typography>
    </Stack>
  );
}