#version 300 es
precision highp float;

in vec3 v_color;
out vec4 fragColor;

void main() {
  vec2 p = gl_PointCoord - 0.5;
  float rR = length(p + vec2(0.026, 0.0)) * 2.0;
  float rG = length(p) * 2.0;
  float rB = length(p - vec2(0.026, 0.0)) * 2.0;

  float red   = smoothstep(1.0, 0.54, rR);
  float green = smoothstep(1.0, 0.54, rG);
  float blue  = smoothstep(1.0, 0.54, rB);
  float alpha = max(max(red, green), blue);
  if (alpha < 0.01) discard;

  fragColor = vec4(vec3(red, green, blue) * v_color, alpha * 0.86);
}
