// transform-stacking.js — compositional snippets for RepoScripter.
// Use these when one transform is too polite and needs to become a whole goblin committee.

import { TRANSFORMS } from '../src/js/transform.js';

export function stackTransforms(names, x, y, strength, angle) {
  let px = x, py = y;
  names.forEach((name, i) => {
    const fn = TRANSFORMS[name] ?? TRANSFORMS.rotation;
    const localStrength = strength * (1.0 - i * 0.12);
    const localAngle = angle + i * 0.17;
    [px, py] = fn(px, py, localStrength, localAngle);
  });
  return [px, py];
}

export function blendTransforms(aName, bName, blend, x, y, strength, angle) {
  const a = TRANSFORMS[aName] ?? TRANSFORMS.rotation;
  const b = TRANSFORMS[bName] ?? TRANSFORMS.scaling;
  const [ax, ay] = a(x, y, strength, angle);
  const [bx, by] = b(x, y, strength, angle);
  return [ax * (1 - blend) + bx * blend, ay * (1 - blend) + by * blend];
}

export const STACK_IDEAS = {
  vortex_lens: ['rotation', 'lens_warp', 'pinwheel'],
  quasi_crackle: ['quasicrystal_pull', 'voronoi_crackle', 'cellular_jitter'],
  wrong_orbit: ['wrong_physics_fold', 'orbit_trap', 'black_hole'],
  vhs_braid: ['moire_slide', 'fourier_braid', 'wave_shear'],
  hyperbolic_mobius: ['hyperbolic_saddle', 'mobius_fold', 'lemniscate_flow']
};
