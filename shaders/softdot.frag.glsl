#version 300 es
precision highp float;

in vec3 v_color;
out vec4 fragColor;

void main() {
  vec2 p = gl_PointCoord - 0.5;
  float r = length(p) * 2.0;
  if (r > 1.0) discard;

  float core = smoothstep(1.0, 0.0, r);
  float edge = smoothstep(1.0, 0.62, r);
  float glow = smoothstep(1.0, 0.0, r) * 0.32;

  vec3 col = v_color * (0.65 + core * 0.8) + glow;
  fragColor = vec4(col, edge * 0.9);
}
