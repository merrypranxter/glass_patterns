// dot-field.js — random dot field generation
// Returns two flat Float32Array buffers: reference dots and transformed dots
// Each dot is: [x, y, isTransformed(0|1), _pad]
// Coordinates in normalised space: x,y in [-1, 1] (pre-aspect-corrected)

import { TRANSFORMS } from './transform.js';

let _seed = Date.now();
export function reseed(s) { _seed = s ?? Date.now(); }

// Deterministic pseudo-random from seed + index
function rand(index) {
  let s = (_seed ^ (index * 2654435761)) >>> 0;
  s ^= s << 13; s ^= s >> 17; s ^= s << 5;
  return (s >>> 0) / 4294967296;
}

/**
 * Build reference + transformed dot arrays.
 * @param {number} N          total dots per field
 * @param {number} correlation fraction of dots that are correlated (0..1)
 * @param {string} xfName     transform name
 * @param {number} strength   transform strength (0..1)
 * @param {number} angle      angle / scale parameter (-1..1)
 * @param {number} aspect     canvas width/height
 * @returns {{ ref: Float32Array, xf: Float32Array, N: number }}
 */
export function buildFields(N, correlation, xfName, strength, angle, aspect) {
  const fn = TRANSFORMS[xfName] ?? TRANSFORMS.rotation;
  // Each dot: x, y, isCorrected, pad  (4 floats)
  const ref = new Float32Array(N * 4);
  const xf  = new Float32Array(N * 4);

  for (let i = 0; i < N; i++) {
    // Random position in [-1, 1] x [-1/aspect, 1/aspect]
    const x = rand(i*3)   * 2 - 1;
    const y = (rand(i*3+1) * 2 - 1) / aspect;
    const isCorrelated = rand(i*3+2) < correlation ? 1.0 : 0.0;

    ref[i*4+0] = x; ref[i*4+1] = y; ref[i*4+2] = 0.0; ref[i*4+3] = 0.0;

    if (isCorrelated > 0.5) {
      const [tx, ty] = fn(x, y, strength, angle);
      xf[i*4+0] = tx; xf[i*4+1] = ty;
    } else {
      // Uncorrelated dot: fresh random position
      xf[i*4+0] = rand(i*3+10) * 2 - 1;
      xf[i*4+1] = (rand(i*3+11) * 2 - 1) / aspect;
    }
    xf[i*4+2] = isCorrelated;
    xf[i*4+3] = 0.0;
  }
  return { ref, xf, N };
}
