// dot-field-advanced.js — optional density-aware field builder.
// The original dot-field.js stays simple. This one is the mutant lab version.

import { TRANSFORMS } from './transform.js';
import { DENSITY_FIELDS } from './density-fields.js';

let _seed = Date.now();
export function reseedAdvanced(s) { _seed = s ?? Date.now(); }

export function rand(index) {
  let s = (_seed ^ (index * 2654435761)) >>> 0;
  s ^= s << 13; s ^= s >> 17; s ^= s << 5;
  return (s >>> 0) / 4294967296;
}

export function buildFieldsAdvanced({
  N = 800,
  correlation = 0.45,
  xfName = 'rotation',
  densityName = 'uniform',
  strength = 0.4,
  angle = 0.2,
  aspect = 1,
  jitter = 0,
  maskFn = null
} = {}) {
  const fn = TRANSFORMS[xfName] ?? TRANSFORMS.rotation;
  const densityFn = DENSITY_FIELDS[densityName] ?? DENSITY_FIELDS.uniform;
  const ref = new Float32Array(N * 4);
  const xf = new Float32Array(N * 4);
  let written = 0;
  let tries = 0;
  const maxTries = N * 80;

  while (written < N && tries < maxTries) {
    tries++;
    let x = rand(tries * 3) * 2 - 1;
    let y = (rand(tries * 3 + 1) * 2 - 1) / aspect;

    const d = Math.max(0, Math.min(1, densityFn(x, y)));
    if (rand(tries * 7) > d) continue;
    if (maskFn && maskFn(x, y) <= 0) continue;

    if (jitter > 0) {
      x += (rand(tries * 17) - 0.5) * jitter;
      y += (rand(tries * 19) - 0.5) * jitter;
    }

    const isCorrelated = rand(tries * 5) < correlation ? 1.0 : 0.0;
    const i = written++;

    ref[i*4+0] = x;
    ref[i*4+1] = y;
    ref[i*4+2] = 0.0;
    ref[i*4+3] = d;

    if (isCorrelated > 0.5) {
      const [tx, ty] = fn(x, y, strength, angle);
      xf[i*4+0] = tx;
      xf[i*4+1] = ty;
    } else {
      xf[i*4+0] = rand(tries * 11) * 2 - 1;
      xf[i*4+1] = (rand(tries * 13) * 2 - 1) / aspect;
    }

    xf[i*4+2] = isCorrelated;
    xf[i*4+3] = d;
  }

  return { ref, xf, N: written };
}
