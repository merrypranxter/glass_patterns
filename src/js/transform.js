import { EXTRA_TRANSFORMS } from './transforms-extra.js';

// transform.js — per-dot transformation math for Glass patterns
// Each regime defines a function (x, y, strength, angle) → (x', y')
// Coordinates are normalised — centre = (0,0), half-width = 1

const BASE_TRANSFORMS = {
  rotation(x, y, strength, angle) {
    // Rotate about origin by angle * strength (radians)
    const theta = angle * strength * Math.PI * 2;
    const cos = Math.cos(theta), sin = Math.sin(theta);
    return [cos*x - sin*y, sin*x + cos*y];
  },
  scaling(x, y, strength, angle) {
    // Radial expansion / contraction
    const s = 1.0 + angle * strength * 0.8;
    return [x * s, y * s];
  },
  radial(x, y, strength, angle) {
    // Tangential displacement (spiral Glass pattern)
    const r = Math.sqrt(x*x + y*y) + 0.0001;
    const k = angle * strength * 0.5;
    return [x + k * (-y) / r, y + k * x / r];
  },
  concentric(x, y, strength, angle) {
    // Displace radially outward (concentric circles)
    const r = Math.sqrt(x*x + y*y) + 0.0001;
    const d = angle * strength * 0.3;
    return [x + d * x / r, y + d * y / r];
  },
  translation(x, y, strength, angle) {
    // Pure lateral displacement
    return [x + angle * strength * 0.4, y + angle * strength * 0.2];
  },
  mixed(x, y, strength, angle) {
    // Rotation + radial combined
    const theta = angle * strength * Math.PI;
    const cos = Math.cos(theta), sin = Math.sin(theta);
    const rx = cos*x - sin*y, ry = sin*x + cos*y;
    const r = Math.sqrt(rx*rx + ry*ry) + 0.0001;
    const k = strength * 0.15;
    return [rx + k * (-ry) / r, ry + k * rx / r];
  }
};

export const TRANSFORMS = { ...BASE_TRANSFORMS, ...EXTRA_TRANSFORMS };
export const TRANSFORM_NAMES = Object.keys(TRANSFORMS);
