// density-fields.js — probability fields for where dots are allowed to appear.
// A density field returns roughly 0..1. buildFieldsAdvanced uses it as a keep/reject probability.
// These are excellent RepoScripter fodder: swap one in and the same transform becomes a new creature.

const TAU = Math.PI * 2;
const clamp01 = v => Math.max(0, Math.min(1, v));
const smooth = (a, b, x) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export const DENSITY_FIELDS = {
  uniform() { return 1; },

  radial_fade(x, y) {
    const r = Math.sqrt(x*x + y*y);
    return clamp01(1 - r * 0.9);
  },

  edge_bloom(x, y) {
    const r = Math.sqrt(x*x + y*y);
    return clamp01((r - 0.18) * 1.25);
  },

  ring_oracle(x, y) {
    const r = Math.sqrt(x*x + y*y);
    return Math.exp(-Math.pow((r - 0.56) * 5.5, 2));
  },

  double_ring(x, y) {
    const r = Math.sqrt(x*x + y*y);
    const a = Math.exp(-Math.pow((r - 0.35) * 8.0, 2));
    const b = Math.exp(-Math.pow((r - 0.72) * 10.0, 2));
    return clamp01(a + b);
  },

  spiral_weather(x, y) {
    const r = Math.sqrt(x*x + y*y);
    const t = Math.atan2(y, x);
    return clamp01(0.52 + 0.48 * Math.sin(t * 5.0 + r * 19.0));
  },

  quasicrystal_static(x, y) {
    let v = 0;
    for (let i = 0; i < 5; i++) {
      const a = i * TAU / 5;
      v += Math.sin(Math.cos(a) * x * 16 + Math.sin(a) * y * 16);
    }
    return clamp01(0.5 + 0.5 * Math.sin(v));
  },

  penrose_grain(x, y) {
    const phi = 1.61803398875;
    const a = Math.sin(x * 12.0 + y * phi * 9.0);
    const b = Math.sin(x * -7.0 * phi + y * 13.0);
    return clamp01(0.5 + 0.28 * a + 0.28 * b);
  },

  scanline_vhs(x, y) {
    const scan = Math.sin(y * 190.0) * 0.18;
    const drift = Math.sin((x + y) * 37.0) * 0.14;
    return clamp01(0.54 + scan + drift);
  },

  cellular_blot(x, y) {
    const v = Math.sin(x * 9.0 + Math.sin(y * 5.0)) + Math.cos(y * 11.0 + Math.cos(x * 6.0));
    return smooth(-0.2, 1.2, v);
  },

  hyperbolic_lobes(x, y) {
    const v = Math.sin((x*x - y*y) * 12.0) + Math.cos(x*y * 18.0);
    return clamp01(0.48 + v * 0.25);
  },

  flower_of_noise(x, y) {
    const r = Math.sqrt(x*x + y*y);
    const t = Math.atan2(y, x);
    const petals = Math.cos(t * 8.0) * 0.5 + 0.5;
    return clamp01((1 - r * 0.75) * (0.35 + petals * 0.9));
  }
};

export const DENSITY_NAMES = Object.keys(DENSITY_FIELDS);
