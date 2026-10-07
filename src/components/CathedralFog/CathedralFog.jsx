import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './CathedralFog.css';

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 uMouse;
out vec4 fragColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
  p += (uMouse - 0.5) * 0.03;

  float t = iTime * 0.04;
  vec2 q = vec2(fbm(p * 1.5 + vec2(0.0, t)), fbm(p * 1.5 + vec2(5.2, -t)));
  float smoke = fbm(p * 2.0 + q * 1.5 + vec2(t * 0.5, -t * 1.5));

  vec3 base = vec3(0.035, 0.022, 0.02);
  vec3 crimson = vec3(0.42, 0.05, 0.06);
  vec3 gold = vec3(0.78, 0.6, 0.32);

  vec3 col = base;
  float bottomGlow = 1.0 - smoothstep(0.0, 0.9, uv.y);
  col += crimson * smoke * bottomGlow * 0.9;

  float shaftWidth = 0.08 + (1.0 - uv.y) * 0.3;
  float shaft = (1.0 - smoothstep(0.0, shaftWidth, abs(p.x))) * smoothstep(0.0, 1.0, uv.y);
  col += gold * shaft * smoke * 0.22;
  col += vec3(0.08, 0.05, 0.04) * smoke * 0.5;

  float vig = 1.0 - smoothstep(0.3, 1.2, length(p * vec2(0.9, 1.1)));
  col *= vig;

  float g = hash(gl_FragCoord.xy + fract(iTime) * 100.0);
  col += (g - 0.5) * 0.025;

  fragColor = vec4(col, 1.0);
}
`;

const CathedralFog = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio || 1, 1.5), antialias: false });
    const gl = renderer.gl;
    const canvas = gl.canvas;
    container.appendChild(canvas);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uMouse: { value: new Float32Array([0.5, 0.5]) }
      }
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const setSize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      program.uniforms.iResolution.value[0] = gl.drawingBufferWidth;
      program.uniforms.iResolution.value[1] = gl.drawingBufferHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const currentMouse = [0.5, 0.5];
    const targetMouse = [0.5, 0.5];
    const onPointerMove = e => {
      targetMouse[0] = e.clientX / window.innerWidth;
      targetMouse[1] = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener('pointermove', onPointerMove);

    let raf = 0;
    const t0 = performance.now();
    const loop = t => {
      program.uniforms.iTime.value = (t - t0) * 0.001;
      currentMouse[0] += 0.03 * (targetMouse[0] - currentMouse[0]);
      currentMouse[1] += 0.03 * (targetMouse[1] - currentMouse[1]);
      program.uniforms.uMouse.value[0] = currentMouse[0];
      program.uniforms.uMouse.value[1] = currentMouse[1];
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (raf === 0) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);
    start();

    return () => {
      stop();
      window.removeEventListener('resize', setSize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
      container.removeChild(canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <div ref={containerRef} className="cathedral-fog" aria-hidden="true" />;
};

export default CathedralFog;
