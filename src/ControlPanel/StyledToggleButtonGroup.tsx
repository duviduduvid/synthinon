import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.2),
    borderColor: 'var(--white-20)',
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
    '&.Mui-selected': {
      backgroundColor: 'var(--black-20)'
    }
  },
}));

export default StyledToggleButtonGroup;