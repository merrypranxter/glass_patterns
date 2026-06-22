// main.js — Glass pattern WebGL2 renderer
// Two interleaved point fields rendered as overlapping GL_POINTS
// No fragment-shader magic needed: the structure is purely spatial.

import { buildFields, reseed } from './dot-field.js';
import { TRANSFORM_NAMES } from './transform.js';

const canvas = document.getElementById('gl');
const gl = canvas.getContext('webgl2');
if (!gl) { document.body.innerHTML = '<p style="color:#fff;padding:2rem">WebGL2 required</p>'; }

// --- Params ---
const P = {
  dot_count:    400,
  dot_radius:   2.5,
  correlation:  0.5,
  strength:     0.3,
  angle:        0.15,
  animate:      0,
  anim_speed:   0.2,
  single_field: 0,
  ref_hue:      0,
  xf_hue:       200,
  color_mix:    0.5,
  xfIndex:      0,
};

// --- Shaders ---
const VS = `#version 300 es
precision highp float;

layout(location=0) in vec2  a_pos;
layout(location=1) in float a_corr;  // 0=uncorrelated, 1=correlated

uniform float u_dot_radius;
uniform float u_aspect;
uniform float u_hue;        // hue of this field (degrees)
uniform float u_color_mix;  // 0=all same hue, 1=correlated=accent

out vec3 v_color;

vec3 hsl2rgb(float h, float s, float l) {
  float a = s * min(l, 1.0 - l);
  float r = l - a * max(min(mod(h/30.0+0.0, 12.0)-3.0, 9.0-mod(h/30.0+0.0, 12.0)), -1.0);
  float g = l - a * max(min(mod(h/30.0+8.0, 12.0)-3.0, 9.0-mod(h/30.0+8.0, 12.0)), -1.0);
  float b = l - a * max(min(mod(h/30.0+4.0, 12.0)-3.0, 9.0-mod(h/30.0+4.0, 12.0)), -1.0);
  return vec3(r, g, b);
}

void main() {
  // Aspect-correct y
  vec2 pos = vec2(a_pos.x, a_pos.y * u_aspect);
  gl_Position  = vec4(pos, 0.0, 1.0);
  gl_PointSize = u_dot_radius * 2.0;

  // Base colour from hue; correlated dots slightly brighter/different
  float sat = mix(0.0, 0.7, u_color_mix);
  float corr_shift = a_corr * u_color_mix * 40.0;
  v_color = hsl2rgb(u_hue + corr_shift, sat, 0.72 + a_corr * 0.12 * u_color_mix);
}
`;

const FS = `#version 300 es
precision highp float;
in vec3 v_color;
out vec4 fragColor;
void main() {
  // Soft circular dot (anti-aliased)
  vec2 c = gl_PointCoord - 0.5;
  float d = dot(c, c) * 4.0;
  if (d > 1.0) discard;
  float alpha = 1.0 - smoothstep(0.6, 1.0, d);
  fragColor = vec4(v_color, alpha * 0.88);
}
`;

function compile(type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src); gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
  return s;
}
const prog = gl.createProgram();
gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
gl.linkProgram(prog);
if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) console.error(gl.getProgramInfoLog(prog));

const uRadius  = gl.getUniformLocation(prog, 'u_dot_radius');
const uAspect  = gl.getUniformLocation(prog, 'u_aspect');
const uHue     = gl.getUniformLocation(prog, 'u_hue');
const uColMix  = gl.getUniformLocation(prog, 'u_color_mix');

// Two VAOs / VBOs: one for reference field, one for transformed
function makeVAO(data) {
  const vao = gl.createVertexArray();
  const vbo = gl.createBuffer();
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
  // a_pos: location 0, stride 16 bytes (4 floats), offset 0
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 16, 0);
  // a_corr: location 1, stride 16, offset 8
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1, 1, gl.FLOAT, false, 16, 8);
  gl.bindVertexArray(null);
  return { vao, vbo };
}

let refGeo = makeVAO(new Float32Array(P.dot_count * 4));
let xfGeo  = makeVAO(new Float32Array(P.dot_count * 4));

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

function aspect() { return canvas.width / canvas.height; }

function rebuild() {
  const { ref, xf, N } = buildFields(
    P.dot_count, P.correlation,
    TRANSFORM_NAMES[P.xfIndex],
    P.strength, P.angle, aspect()
  );
  gl.bindBuffer(gl.ARRAY_BUFFER, refGeo.vbo);
  gl.bufferData(gl.ARRAY_BUFFER, ref, gl.DYNAMIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, xfGeo.vbo);
  gl.bufferData(gl.ARRAY_BUFFER, xf,  gl.DYNAMIC_DRAW);
  updateHint();
}
rebuild();

function updateHint() {
  const c = P.correlation;
  const el = document.getElementById('detect-hint');
  if (c < 0.15) { el.textContent = 'below threshold · invisible'; el.style.color = 'rgba(255,80,80,0.45)'; }
  else if (c < 0.3) { el.textContent = 'near threshold · barely visible'; el.style.color = 'rgba(255,200,80,0.45)'; }
  else if (c <= 0.6) { el.textContent = 'optimal · global form detectable'; el.style.color = 'rgba(100,255,130,0.45)'; }
  else { el.textContent = 'high correlation · form very clear'; el.style.color = 'rgba(100,200,255,0.45)'; }
}

// --- UI wiring ---
const PREC = { dot_count:0, dot_radius:1, correlation:2, strength:2, angle:2, animate:0, anim_speed:2, single_field:0, ref_hue:0, xf_hue:0, color_mix:2 };
const REBUILDS = new Set(['dot_count','correlation','strength','angle']);
const LABEL = { animate:['off','on'], single_field:['off','on'] };

['dot_count','dot_radius','correlation','strength','angle','animate','anim_speed','single_field','ref_hue','xf_hue','color_mix'].forEach(id => {
  const el  = document.getElementById(id);
  const val = document.getElementById('v-'+id);
  if (!el) return;
  el.addEventListener('input', () => {
    P[id] = parseFloat(el.value);
    val.textContent = LABEL[id] ? LABEL[id][Math.round(P[id])] : P[id].toFixed(PREC[id]??2);
    if (REBUILDS.has(id)) rebuild();
  });
});

document.querySelectorAll('[data-xf]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-xf]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    P.xfIndex = TRANSFORM_NAMES.indexOf(btn.dataset.xf);
    rebuild();
  });
});

document.getElementById('btn-reseed').addEventListener('click', () => { reseed(); rebuild(); });
document.getElementById('btn-snapshot').addEventListener('click', () => {
  const a = document.createElement('a');
  a.download = 'glass_pattern.png';
  a.href = canvas.toDataURL('image/png');
  a.click();
});

document.addEventListener('keydown', e => {
  switch (e.code) {
    case 'Space': e.preventDefault();
      P.xfIndex = (P.xfIndex + 1) % TRANSFORM_NAMES.length;
      document.querySelectorAll('[data-xf]').forEach((b,i) => b.classList.toggle('active', i===P.xfIndex));
      rebuild(); break;
    case 'Equal': case 'NumpadAdd':
      P.dot_count = Math.min(800, P.dot_count + 20);
      document.getElementById('dot_count').value = P.dot_count;
      document.getElementById('v-dot_count').textContent = P.dot_count; rebuild(); break;
    case 'Minus': case 'NumpadSubtract':
      P.dot_count = Math.max(50, P.dot_count - 20);
      document.getElementById('dot_count').value = P.dot_count;
      document.getElementById('v-dot_count').textContent = P.dot_count; rebuild(); break;
    case 'ArrowUp': e.preventDefault();
      P.strength = Math.min(1, +(P.strength + 0.05).toFixed(2));
      document.getElementById('strength').value = P.strength;
      document.getElementById('v-strength').textContent = P.strength.toFixed(2); rebuild(); break;
    case 'ArrowDown': e.preventDefault();
      P.strength = Math.max(0, +(P.strength - 0.05).toFixed(2));
      document.getElementById('strength').value = P.strength;
      document.getElementById('v-strength').textContent = P.strength.toFixed(2); rebuild(); break;
    case 'KeyA':
      P.animate = P.animate > 0.5 ? 0 : 1;
      document.getElementById('animate').value = P.animate;
      document.getElementById('v-animate').textContent = P.animate > 0.5 ? 'on' : 'off'; break;
    case 'KeyS':
      P.single_field = P.single_field > 0.5 ? 0 : 1;
      document.getElementById('single_field').value = P.single_field;
      document.getElementById('v-single_field').textContent = P.single_field > 0.5 ? 'on' : 'off'; break;
    case 'KeyR': reseed(); rebuild(); break;
  }
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  rebuild();
});

// --- Render loop ---
let lastFrame = 0, frameCount = 0, lastFPS = performance.now();
const fpsEl = document.getElementById('fps');

gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
gl.disable(gl.DEPTH_TEST);
gl.useProgram(prog);

function render(now) {
  requestAnimationFrame(render);
  frameCount++;
  if (now - lastFPS > 1000) { fpsEl.textContent = frameCount + ' fps'; frameCount = 0; lastFPS = now; }

  // Animate: sweep the transform parameter
  if (P.animate > 0.5) {
    P.angle = Math.sin(now * 0.001 * P.anim_speed) * 0.8;
    document.getElementById('angle').value = P.angle;
    document.getElementById('v-angle').textContent = P.angle.toFixed(2);
    rebuild();
  }

  const W = canvas.width, H = canvas.height;
  gl.viewport(0, 0, W, H);
  gl.clearColor(0.04, 0.04, 0.06, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.uniform1f(uAspect,  H / W);   // correct points to screen
  gl.uniform1f(uRadius,  P.dot_radius);
  gl.uniform1f(uColMix,  P.color_mix);

  // Draw reference field (white / ref_hue)
  gl.uniform1f(uHue, P.ref_hue);
  gl.bindVertexArray(refGeo.vao);
  gl.drawArrays(gl.POINTS, 0, P.dot_count);

  // Draw transformed field (xf_hue) — unless single_field
  if (P.single_field < 0.5) {
    gl.uniform1f(uHue, P.xf_hue);
    gl.bindVertexArray(xfGeo.vao);
    gl.drawArrays(gl.POINTS, 0, P.dot_count);
  }

  gl.bindVertexArray(null);
}

requestAnimationFrame(render);
