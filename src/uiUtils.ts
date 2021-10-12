export function setKeyboardRandomColor() {
  const root = document.documentElement;
  const hues = [300, 350, 250, 186, 220, 315, 175];
  const hue = hues[Math.floor(Math.random() * hues.length)];
  const saturation = 100 - Math.round(Math.random() * 15);
  const lightness = 5 + Math.round(Math.random() * 25);

  root.style.setProperty('--keyboard', `hsl(${hue}, ${saturation}%, ${lightness}%)`);
}

export function setColor(hslColor: string) {
  const root = document.documentElement;
  root.style.setProperty('--keyboard', hslColor);
}