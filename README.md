# Glass Patterns

A WebGL2 / JavaScript lab for making Glass patterns: emergent global forms generated from random dot fields with hidden geometric correlation.

This repo is meant to feed RepoScripter / art-code agents. It is not just a finished sketch. It is a cookbook of transform math, density fields, shaders, presets, and weird little pattern grammars that can be remixed into new generative art.

## Core trick

The image is not drawn directly.

Instead:

1. Generate a random reference dot field.
2. Generate a second dot field.
3. For some percentage of dots, make the second point a transformed version of the first.
4. For the rest, use unrelated random positions.
5. Render both fields together.

Your visual system detects the hidden statistical correlation and reconstructs a larger global form from noise.

That is the whole goblin: randomness wearing a secret geometry mask.

## Current interactive sketch

Open `index.html` in a browser or through a local static server.

Controls include:

- transform type
- dot count
- dot radius
- correlation strength
- transform strength
- angle / scale
- animation speed
- single-field mode
- hue controls
- snapshot export

The UI now exposes both base transforms and mutant transforms.

## Important files

```text
glass_patterns/
  index.html
  README.md
  src/js/
    main.js                 interactive WebGL2 renderer
    dot-field.js            simple reference/transformed field builder
    transform.js            base transforms + extra transform registry
    transforms-extra.js     20 extra transform functions
    dot-field-advanced.js   density-aware optional field builder
    density-fields.js       probability fields for dot placement
    palettes.js             color palette cookbook
    presets.js              named art-code presets
    art-recipes.js          high-level RepoScripter recipe cards
  shaders/
    softdot.frag.glsl
    chromatic-dot.frag.glsl
    phosphor-dot.frag.glsl
```

## Base transforms

- `rotation`
- `scaling`
- `radial`
- `concentric`
- `translation`
- `mixed`

## Extra transforms

- `pinwheel`
- `black_hole`
- `lens_warp`
- `fisheye_inverse`
- `wave_shear`
- `lissajous_drift`
- `hyperbolic_saddle`
- `mobius_fold`
- `kaleidoscope_nudge`
- `quasicrystal_pull`
- `penrose_slip`
- `cellular_jitter`
- `voronoi_crackle`
- `lemniscate_flow`
- `logarithmic_spiral`
- `fourier_braid`
- `moire_slide`
- `reaction_diffusion_hint`
- `orbit_trap`
- `wrong_physics_fold`

## Density fields

Density fields bias the random dot placement before the transform happens. This keeps the Glass-pattern concept intact while giving the randomness a body plan.

Examples:

- `uniform`
- `radial_fade`
- `edge_bloom`
- `ring_oracle`
- `double_ring`
- `spiral_weather`
- `quasicrystal_static`
- `penrose_grain`
- `scanline_vhs`
- `cellular_blot`
- `hyperbolic_lobes`
- `flower_of_noise`

## Agent prompt seed

Use this repo as a generative art code source. Do not simply draw shapes. Preserve the Glass-pattern logic: two random dot fields, partial hidden correlation, one transformed field, emergent global form from statistical structure. Remix transforms, density fields, palettes, point shaders, and presets to produce new interactive WebGL / Canvas examples.

Good mutations:

- stacked transforms
- animated transform parameters
- per-region density fields
- color changes based on correlation
- shader materials for points
- CRT / phosphor / chromatic dot rendering
- quasicrystal and hyperbolic correlation fields
- single-file examples for quick browser testing

Avoid turning it into generic wallpaper. The point is hidden correlation, not just drawing a spiral and calling it done.
