#version 300 es
precision highp float;

in vec3 v_color;
out vec4 fragColor;

void main() {
  vec2 p = gl_PointCoord - 0.5;
  float r = length(p) * 2.0;
  if (r > 1.0) discard;

  float scan = 0.76 + 0.24 * sin(gl_FragCoord.y * 3.14159);
  float dot = smoothstep(1.0, 0.28, r);
  float halo = smoothstep(1.0, 0.0, r) * 0.35;
  vec3 col = v_color * scan * dot + v_color * halo;

  fragColor = vec4(col, dot * 0.92);
}
