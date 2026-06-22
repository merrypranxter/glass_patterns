// transforms-extra.js — extra transform math for Glass patterns
// Each function: (x, y, strength, angle) -> [x2, y2]
// Built for RepoScripter art-code remixing: copy, mutate, stack, abuse.

const TAU = Math.PI * 2;
const EPS = 0.0001;
const rot = (x, y, a) => {
  const c = Math.cos(a), s = Math.sin(a);
  return [c*x - s*y, s*x + c*y];
};
const hash = (x, y) => {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return n - Math.floor(n);
};

export const EXTRA_TRANSFORMS = {
  pinwheel(x, y, strength, angle) {
    const r = Math.sqrt(x*x + y*y) + EPS;
    const t = Math.atan2(y, x) + strength * angle * 1.4 / (r + 0.2);
    return [Math.cos(t) * r, Math.sin(t) * r];
  },

  black_hole(x, y, strength, angle) {
    const r = Math.sqrt(x*x + y*y) + EPS;
    const pull = 1.0 - strength * 0.34 / (r + 0.38);
    const spin = angle * strength * 1.8 / (r + 0.22);
    const [rx, ry] = rot(x * pull, y * pull, spin);
    return [rx, ry];
  },

  lens_warp(x, y, strength, angle) {
    const r2 = x*x + y*y;
    const bend = 1.0 + angle * strength * r2 * 1.6;
    return [x * bend, y * bend];
  },

  fisheye_inverse(x, y, strength, angle) {
    const r = Math.sqrt(x*x + y*y) + EPS;
    const bend = 1.0 / (1.0 + strength * (0.7 + angle) * r);
    return [x * bend, y * bend];
  },

  wave_shear(x, y, strength, angle) {
    const amp = strength * 0.22;
    const freq = 5.0 + Math.abs(angle) * 18.0;
    return [
      x + Math.sin(y * freq) * amp * Math.sign(angle || 1),
      y + Math.sin(x * freq * 0.73) * amp
    ];
  },

  lissajous_drift(x, y, strength, angle) {
    const a = 3.0;
    const b = 4.0 + Math.round(Math.abs(angle) * 5.0);
    const k = strength * 0.16;
    return [x + Math.sin(y * b + angle * Math.PI) * k, y + Math.sin(x * a) * k];
  },

  hyperbolic_saddle(x, y, strength, angle) {
    const k = strength * angle * 0.5;
    return [x + k * x * y, y + k * (x*x - y*y) * 0.5];
  },

  mobius_fold(x, y, strength, angle) {
    const r = Math.sqrt(x*x + y*y) + EPS;
    const t = Math.atan2(y, x);
    const fold = Math.sin(t * 2.0 + angle * Math.PI) * strength * 0.24;
    return [x + fold * Math.cos(t + Math.PI/2), y + fold * Math.sin(t + Math.PI/2)];
  },

  kaleidoscope_nudge(x, y, strength, angle) {
    const sides = 5.0 + Math.floor(Math.abs(angle) * 8.0);
    const sector = TAU / sides;
    const r = Math.sqrt(x*x + y*y);
    let t = Math.atan2(y, x);
    t = Math.abs(((t + sector / 2) % sector) - sector / 2);
    const k = strength * 0.13;
    return [Math.cos(t) * r + k * Math.sin(y * 11.0), Math.sin(t) * r + k * Math.cos(x * 11.0)];
  },

  quasicrystal_pull(x, y, strength, angle) {
    const k = strength * 0.085;
    const n = 5;
    let dx = 0, dy = 0;
    for (let i = 0; i < n; i++) {
      const a = i * TAU / n + angle;
      const w = Math.sin(Math.cos(a) * x * 14.0 + Math.sin(a) * y * 14.0);
      dx += Math.cos(a) * w;
      dy += Math.sin(a) * w;
    }
    return [x + dx * k, y + dy * k];
  },

  penrose_slip(x, y, strength, angle) {
    const phi = 1.61803398875;
    const a = Math.atan2(y, x);
    const r = Math.sqrt(x*x + y*y) + EPS;
    const slip = Math.sin(a * 5.0 + r * 12.0 * phi + angle * TAU) * strength * 0.12;
    return [x + Math.cos(a + Math.PI/2) * slip, y + Math.sin(a + Math.PI/2) * slip];
  },

  cellular_jitter(x, y, strength, angle) {
    const cells = 8.0 + Math.abs(angle) * 32.0;
    const gx = Math.floor((x + 1.0) * cells);
    const gy = Math.floor((y + 1.0) * cells);
    const n = hash(gx, gy) * TAU;
    const k = strength * 0.075;
    return [x + Math.cos(n) * k, y + Math.sin(n) * k];
  },

  voronoi_crackle(x, y, strength, angle) {
    const cells = 6 + Math.floor(Math.abs(angle) * 18);
    const gx = Math.floor((x + 1) * cells);
    const gy = Math.floor((y + 1) * cells);
    const cx = (gx + hash(gx, gy)) / cells * 2 - 1;
    const cy = (gy + hash(gy, gx)) / cells * 2 - 1;
    const dx = x - cx, dy = y - cy;
    const r = Math.sqrt(dx*dx + dy*dy) + EPS;
    const k = strength * 0.1;
    return [x + dx/r * k * angle, y + dy/r * k * angle];
  },

  lemniscate_flow(x, y, strength, angle) {
    const a = Math.atan2(y, x);
    const r = Math.sqrt(x*x + y*y) + EPS;
    const d = Math.sin(2.0 * a + angle * TAU) * strength * 0.18;
    return [x + d * y / r, y + d * x / r];
  },

  logarithmic_spiral(x, y, strength, angle) {
    const r = Math.sqrt(x*x + y*y) + EPS;
    const t = Math.atan2(y, x) + Math.log(r + 1.0) * angle * strength * 5.0;
    return [Math.cos(t) * r, Math.sin(t) * r];
  },

  fourier_braid(x, y, strength, angle) {
    const k = strength * 0.075;
    const nx = Math.sin(y * 4.0 + angle) + 0.5 * Math.sin(y * 9.0 - angle * 2.0);
    const ny = Math.cos(x * 5.0 - angle) + 0.5 * Math.cos(x * 11.0 + angle * 2.0);
    return [x + nx * k, y + ny * k];
  },

  moire_slide(x, y, strength, angle) {
    const bands = Math.sin((x + y) * (18 + Math.abs(angle) * 60));
    const k = bands * strength * 0.05;
    return [x + k, y - k * angle];
  },

  reaction_diffusion_hint(x, y, strength, angle) {
    const a = Math.sin(x * 12.0 + Math.sin(y * 7.0));
    const b = Math.cos(y * 13.0 + Math.cos(x * 6.0));
    const k = strength * 0.06;
    return [x + a * k * angle, y + b * k];
  },

  orbit_trap(x, y, strength, angle) {
    let zx = x, zy = y;
    for (let i = 0; i < 5; i++) {
      const xx = zx*zx - zy*zy + x * 0.22;
      zy = 2.0*zx*zy + y * 0.22;
      zx = xx;
      const rr = Math.sqrt(zx*zx + zy*zy);
      if (rr > 2.0) break;
    }
    const k = strength * 0.07;
    return [x + Math.sin(zx + angle * TAU) * k, y + Math.cos(zy - angle * TAU) * k];
  },

  wrong_physics_fold(x, y, strength, angle) {
    const r2 = x*x + y*y + EPS;
    const invx = x / r2;
    const invy = y / r2;
    const k = strength * 0.08;
    return [x + invx * k * angle, y - invy * k];
  }
};
