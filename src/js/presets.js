// presets.js — starter states for the interactive app and generated examples.
// Names are deliberately vivid so RepoScripter has semantic hooks to mutate from.

export const PRESETS = {
  classic_rotation_detection: {
    xf: 'rotation', density: 'uniform', dot_count: 520, dot_radius: 2.1,
    correlation: 0.44, strength: 0.28, angle: 0.15, ref_hue: 0, xf_hue: 200, color_mix: 0.55
  },
  pinwheel_candy_implosion: {
    xf: 'pinwheel', density: 'spiral_weather', dot_count: 950, dot_radius: 1.55,
    correlation: 0.52, strength: 0.78, angle: 0.55, ref_hue: 310, xf_hue: 170, color_mix: 0.95
  },
  quasicrystal_ghost_field: {
    xf: 'quasicrystal_pull', density: 'quasicrystal_static', dot_count: 1250, dot_radius: 1.2,
    correlation: 0.47, strength: 0.7, angle: 0.25, ref_hue: 120, xf_hue: 292, color_mix: 1
  },
  black_hole_radio_static: {
    xf: 'black_hole', density: 'edge_bloom', dot_count: 1120, dot_radius: 1.35,
    correlation: 0.38, strength: 0.62, angle: -0.48, ref_hue: 260, xf_hue: 45, color_mix: 0.8
  },
  hyperbolic_saddle_lobes: {
    xf: 'hyperbolic_saddle', density: 'hyperbolic_lobes', dot_count: 880, dot_radius: 1.7,
    correlation: 0.5, strength: 0.75, angle: 0.55, ref_hue: 355, xf_hue: 188, color_mix: 0.88
  },
  vhs_moire_drift: {
    xf: 'moire_slide', density: 'scanline_vhs', dot_count: 1400, dot_radius: 1.0,
    correlation: 0.34, strength: 0.5, angle: 0.7, ref_hue: 92, xf_hue: 302, color_mix: 0.9
  },
  reaction_diffusion_mouthless_oracle: {
    xf: 'reaction_diffusion_hint', density: 'cellular_blot', dot_count: 1300, dot_radius: 1.1,
    correlation: 0.41, strength: 0.84, angle: -0.35, ref_hue: 35, xf_hue: 184, color_mix: 1
  },
  penrose_slip_static: {
    xf: 'penrose_slip', density: 'penrose_grain', dot_count: 1180, dot_radius: 1.25,
    correlation: 0.46, strength: 0.66, angle: 0.2, ref_hue: 58, xf_hue: 285, color_mix: 0.93
  },
  wrong_physics_inversion: {
    xf: 'wrong_physics_fold', density: 'ring_oracle', dot_count: 1050, dot_radius: 1.45,
    correlation: 0.5, strength: 0.58, angle: -0.72, ref_hue: 190, xf_hue: 335, color_mix: 0.86
  },
  cellular_voronoi_crackle: {
    xf: 'voronoi_crackle', density: 'double_ring', dot_count: 1500, dot_radius: 0.95,
    correlation: 0.36, strength: 0.8, angle: 0.44, ref_hue: 84, xf_hue: 210, color_mix: 0.98
  }
};

export const PRESET_NAMES = Object.keys(PRESETS);
