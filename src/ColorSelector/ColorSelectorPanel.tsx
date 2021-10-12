import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ToggleButton from '@mui/material/ToggleButton';
import StyledToggleButtonGroup from '../ControlPanel/StyledToggleButtonGroup';
import { setColor } from "../uiUtils";

export default function ColorSelectorPanel() {
  const colors = [
    { color: 'hsl(325, 88%, 18%)', name: "Deep Purple" }, 
    { color: 'hsl(300, 100%, 14%)', name: "Dark Purple" }, 
    { color: 'hsl(350, 90%, 20%)', name: "Dark Red" },
    { color: 'hsl(250, 89%, 16%)', name: "Steel Blue" }, 
    { color: 'hsl(220, 88%, 23%)', name: "Deep Royal" }, 
    { color: 'hsl(190, 90%, 15%)', name: "Golf Green" }, 
  ];
  const [selectedColor, setSelectedColor] = useState<{color: string, name: string}>(colors[0]);

  const handleChange = (e: React.MouseEvent<HTMLElement>, selectedColorName: string) => {
    const selectedColor = colors.find(color => color.name === selectedColorName);
    if (selectedColor) {
      setSelectedColor((_) => selectedColor);
      setColor(selectedColor.color);
    }
  };

  useEffect(() => {
    setColor("hsl(325, 86%, 20%)");
  }, []);

  return (
    <Container sx={{
      margin: 2,
      padding: 2,
      boxShadow: "0 0 50px var(--black-50) inset, 0 1px var(--keyboard-shadow) inset, 0 5px 15px var(--black-50)",
      backgroundColor: "var(--keyboard)",
      borderRadius: '1rem',
      color: 'var(--white-50)',
      width: '10%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
        <Typography padding="10px">Color</Typography>
        <StyledToggleButtonGroup
          orientation="vertical"
          value={selectedColor.name}
          exclusive
          size="small"
          onChange={handleChange}
        >
        {colors.map((colorObj, index) => (
          <ToggleButton 
            key={index} 
            value={colorObj.name} 
            aria-label={colorObj.name} 
            sx={{
              backgroundColor: colorObj.color
            }}
          >
            <Typography 
              fontSize="10px" 
              color="var(--white-50)"
            >
              {colorObj.name}
            </Typography>
          </ToggleButton>
        ))}
      </StyledToggleButtonGroup>
    </Container>
  );
}