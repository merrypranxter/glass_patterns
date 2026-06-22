// art-recipes.js — higher-level recipe objects for RepoScripter.
// Think of these as spell cards: transform + density + palette + verbal intent.

export const ART_RECIPES = [
  {
    id: 'glass_oracle_rotation',
    title: 'Classic Glass Oracle Rotation',
    prompt: 'Two random dot fields with a hidden rotational correlation; keep it sparse enough that the brain has to work.',
    transform: 'rotation', density: 'uniform', palette: 'phosphor_ghost'
  },
  {
    id: 'quasicrystal_static_bloom',
    title: 'Quasicrystal Static Bloom',
    prompt: 'Use fivefold interference as a density field and a quasicrystal pull transform; make it feel like a hallucinated diffraction plate.',
    transform: 'quasicrystal_pull', density: 'quasicrystal_static', palette: 'acid_candy'
  },
  {
    id: 'black_hole_field_lens',
    title: 'Black Hole Field Lens',
    prompt: 'The hidden correspondence curls inward like gravity got drunk and started doing calligraphy.',
    transform: 'black_hole', density: 'edge_bloom', palette: 'oil_slick'
  },
  {
    id: 'vhs_moire_detection_test',
    title: 'VHS Moire Detection Test',
    prompt: 'Scanline-biased dot probability with a sliding moire transform; rotten CRT ghost geometry, but clean WebGL structure.',
    transform: 'moire_slide', density: 'scanline_vhs', palette: 'citrus_glitch'
  },
  {
    id: 'slime_mold_not_slime_mold',
    title: 'Slime Mold Not Slime Mold',
    prompt: 'Cellular blot density and reaction-diffusion-ish displacement; no actual simulation, just the visual grammar of crawling emergence.',
    transform: 'reaction_diffusion_hint', density: 'cellular_blot', palette: 'lab_specimen'
  },
  {
    id: 'wrong_physics_ring',
    title: 'Wrong Physics Ring',
    prompt: 'Radial ring density with inverted-space displacement; like a diagram of an equation that should have been supervised.',
    transform: 'wrong_physics_fold', density: 'ring_oracle', palette: 'boro_glass'
  },
  {
    id: 'hyperbolic_lobe_static',
    title: 'Hyperbolic Lobe Static',
    prompt: 'Saddle transform plus hyperbolic density lobes; global structure should feel like invisible geometry pressing through noise.',
    transform: 'hyperbolic_saddle', density: 'hyperbolic_lobes', palette: 'bruised_neon'
  },
  {
    id: 'penrose_grain_slip',
    title: 'Penrose Grain Slip',
    prompt: 'Golden-ratio density grain with subtle fivefold slip; not a tiling, more like the ghost of one in random dot static.',
    transform: 'penrose_slip', density: 'penrose_grain', palette: 'toxic_aquarium'
  }
];
