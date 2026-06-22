# Glass Pattern Example Ideas

These are recipe notes for RepoScripter and future single-file sketches. The examples are intentionally modular: choose a transform, choose a density field, choose a point shader, then let the hidden correlation do the visual work.

## 01 Classic Detection Test

```js
{
  transform: 'rotation',
  density: 'uniform',
  dot_count: 520,
  correlation: 0.44,
  strength: 0.28,
  angle: 0.15,
  pointShader: 'softdot'
}
```

The point is to see the classic Glass pattern effect before making it weird.

## 02 Pinwheel Candy Implosion

```js
{
  transform: 'pinwheel',
  density: 'spiral_weather',
  dot_count: 950,
  correlation: 0.52,
  strength: 0.78,
  angle: 0.55,
  pointShader: 'chromatic-dot'
}
```

This should feel like a spiral hiding inside static, not a spiral drawn on top of static.

## 03 Quasicrystal Ghost Field

```js
{
  transform: 'quasicrystal_pull',
  density: 'quasicrystal_static',
  dot_count: 1250,
  correlation: 0.47,
  strength: 0.7,
  angle: 0.25,
  pointShader: 'phosphor-dot'
}
```

Fivefold interference creates the dot weather. The transform creates the ghost geometry.

## 04 VHS Moire Detection Test

```js
{
  transform: 'moire_slide',
  density: 'scanline_vhs',
  dot_count: 1400,
  correlation: 0.34,
  strength: 0.5,
  angle: 0.7,
  pointShader: 'phosphor-dot'
}
```

Low correlation plus scanline-biased dot placement makes the form barely detectable, like a cursed CRT doing math in the basement.

## 05 Wrong Physics Ring

```js
{
  transform: 'wrong_physics_fold',
  density: 'ring_oracle',
  dot_count: 1050,
  correlation: 0.5,
  strength: 0.58,
  angle: -0.72,
  pointShader: 'chromatic-dot'
}
```

Radial ring density plus inverted coordinate displacement. Use this when the image should feel like Euclid got fired.

## 06 Slime-Mold-ish Correlation Bloom

```js
{
  transform: 'reaction_diffusion_hint',
  density: 'cellular_blot',
  dot_count: 1300,
  correlation: 0.41,
  strength: 0.84,
  angle: -0.35,
  pointShader: 'softdot'
}
```

Not a real simulation. More like reaction-diffusion drag makeup smeared across Glass-pattern logic.

## 07 Hyperbolic Saddle Lobes

```js
{
  transform: 'hyperbolic_saddle',
  density: 'hyperbolic_lobes',
  dot_count: 880,
  correlation: 0.5,
  strength: 0.75,
  angle: 0.55,
  pointShader: 'softdot'
}
```

Good for subtle spatial pressure, like an invisible manifold poking through the dot field.

## 08 Penrose Grain Slip

```js
{
  transform: 'penrose_slip',
  density: 'penrose_grain',
  dot_count: 1180,
  correlation: 0.46,
  strength: 0.66,
  angle: 0.2,
  pointShader: 'chromatic-dot'
}
```

Do not render a Penrose tiling. Let the golden-ratio grain bias the randomness and let the correlation imply structure.
