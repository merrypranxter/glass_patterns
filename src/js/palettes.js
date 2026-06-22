// palettes.js — color sets for glass-pattern art sketches.
// Current main.js still uses hue sliders; these palettes are for examples and RepoScripter remixing.

export const PALETTES = {
  acid_candy: ['#ff2bd6', '#00f5ff', '#d6ff00', '#ff8a00', '#7a2cff'],
  toxic_aquarium: ['#00ffc8', '#00a2ff', '#b8ff00', '#ff00aa', '#fff000'],
  boro_glass: ['#ff4fd8', '#00ffee', '#ff9d00', '#7b61ff', '#ffffff'],
  phosphor_ghost: ['#9cff00', '#00ffd5', '#52a7ff', '#f4fff8'],
  bruised_neon: ['#4b00ff', '#ff006e', '#00e5ff', '#ffbe0b'],
  citrus_glitch: ['#ff3d00', '#ffd500', '#a7ff00', '#00eaff'],
  oil_slick: ['#7a00ff', '#00ffe1', '#ff007c', '#ffe600', '#001eff'],
  lab_specimen: ['#b8ff00', '#ff4dd2', '#00b7ff', '#ff6b00', '#eaffff'],
  monochrome_detection: ['#ffffff', '#aaaaaa', '#777777', '#333333'],
  warm_static: ['#ff0054', '#ff5400', '#ffbd00', '#390099']
};

export function paletteToHueGuess(hex) {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0;
  if (max !== min) {
    const d = max - min;
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0));
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return h;
}
