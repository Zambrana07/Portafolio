import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { SWORD_FOCUS_EVENT, SWORD_TARGETS } from '../../lib/swordFocus';
import './SwordScene.css';

const CAMERA_DISTANCE = 10;
const CAMERA_FOV = 30;
const TIP_DIRECTION = -1;
const FADE_IN_SECONDS = 1.4;

const orientVertically = model => {
  const size = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3());
  if (size.x >= size.y && size.x >= size.z) model.rotation.z = Math.PI / 2;
  else if (size.z >= size.y && size.z >= size.x) model.rotation.x = Math.PI / 2;
  if (TIP_DIRECTION < 0) model.rotation.z += Math.PI;
};

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const wrapAngle = a => Math.atan2(Math.sin(a), Math.cos(a));

const screenAngle = (dx, dy) => Math.atan2(-dy, dx) - Math.PI / 2;

const pointAt = (tipX, tipY, dx, dy, length) => {
  const n = Math.hypot(dx, dy);
  const ux = dx / n;
  const uy = dy / n;
  return {
    x: tipX - (ux * length) / 2,
    y: tipY - (uy * length) / 2,
    angle: screenAngle(ux, uy),
    length,
    dirX: ux,
    dirY: uy
  };
};

const pickTarget = (hovered, vw, vh) => {
  if (hovered?.isConnected) return hovered;
  let best = null;
  let bestScore = Infinity;
  document.querySelectorAll(SWORD_TARGETS).forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.bottom <= 0 || r.top >= vh) return;
    const score = Math.abs(r.top + r.height / 2 - vh / 2) + 0.3 * Math.abs(r.left + r.width / 2 - vw / 2);
    if (score < bestScore) {
      bestScore = score;
      best = el;
    }
  });
  return best;
};

const poseFor = (el, vw, vh, lite) => {
  const hero = { x: vw / 2, y: vh / 2, angle: Math.PI, length: vh * 0.82, tilt: 0, opacity: lite ? 0.22 : 0.38, mode: 'hero' };
  if (!el || el.classList.contains('hero')) return hero;

  const r = el.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;

  if (el.classList.contains('chapter-header')) {
    return {
      x: cx,
      y: cy,
      angle: -Math.PI,
      length: vh * (lite ? 0.5 : 0.6),
      tilt: 0.15,
      opacity: lite ? 0.3 : 0.5,
      mode: 'plant'
    };
  }

  if (lite) {
    return { x: vw / 2, y: vh / 2, angle: -Math.PI * 0.78, length: vh * 0.95, tilt: 0, opacity: 0.13, mode: 'rest' };
  }

  const isGridCard = el.classList.contains('cert-card');
  if (!isGridCard && r.width < vw * 0.55) {
    const onLeft = cx < vw / 2;
    const empty = onLeft ? vw - r.right : r.left;
    const tipX = onLeft ? r.right + 36 : r.left - 36;
    const tipY = clamp(cy, vh * 0.22, vh * 0.78);
    const length = Math.min(vh * 0.62, empty * 0.85);
    return { ...pointAt(tipX, tipY, onLeft ? -0.96 : 0.96, 0.28, length), tilt: 0.35, opacity: 0.92, mode: 'point' };
  }

  const tipY = clamp(r.top - 24, vh * 0.2, vh * 0.7);
  return { ...pointAt(cx + r.width * 0.08, tipY, -0.42, 0.91, vh * 0.46), tilt: 0.3, opacity: 0.85, mode: 'point' };
};

const SwordScene = ({ modelUrl }) => {
  const containerRef = useRef(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const container = containerRef.current;

    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const liteQuery = window.matchMedia('(max-width: 900px), (pointer: coarse)');
    const renderer = new THREE.WebGLRenderer({ antialias: !coarse, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1.25 : 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(CAMERA_FOV, 1, 0.1, 100);
    camera.position.set(0, 0, CAMERA_DISTANCE);

    scene.add(new THREE.HemisphereLight(0xffe2b0, 0x220808, 0.7));
    const key = new THREE.DirectionalLight(0xffd59a, 2.4);
    key.position.set(3, 5, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x7fa6ff, 2);
    rim.position.set(-4, -2, -4);
    scene.add(rim);

    const aim = new THREE.Group();
    const tilt = new THREE.Group();
    const roll = new THREE.Group();
    aim.add(tilt);
    tilt.add(roll);
    scene.add(aim);

    const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(CAMERA_FOV / 2)) * CAMERA_DISTANCE;
    const clock = new THREE.Clock();
    let disposed = false;
    let loadedAt = -1;

    new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).load(
      modelUrl,
      gltf => {
        if (disposed) return;
        const model = gltf.scene;
        orientVertically(model);

        const holder = new THREE.Group();
        holder.add(model);
        const box = new THREE.Box3().setFromObject(holder);
        model.position.sub(box.getCenter(new THREE.Vector3()));
        holder.scale.setScalar(1 / box.getSize(new THREE.Vector3()).y);

        roll.add(holder);
        loadedAt = clock.getElapsedTime();
        setStatus('ready');
      },
      undefined,
      () => {
        if (!disposed) setStatus('missing');
      }
    );

    const setSize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    setSize();
    window.addEventListener('resize', setSize);

    let hovered = null;
    const onFocus = e => (hovered = e.detail);
    window.addEventListener(SWORD_FOCUS_EVENT, onFocus);

    const current = { x: window.innerWidth / 2, y: window.innerHeight / 2, angle: Math.PI, length: window.innerHeight * 0.82, tilt: 0, opacity: 0 };
    let currentRoll = 0;
    let rollBase = 0;
    let lastTarget;
    let flourish = 1;
    let raf = 0;
    let frame = 0;
    let lastTime = 0;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (coarse && frame++ % 2) return;
      const t = clock.getElapsedTime();
      const dt = Math.min(t - lastTime, 0.1);
      lastTime = t;
      if (loadedAt < 0) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const target = pickTarget(hovered, vw, vh);
      const pose = poseFor(target, vw, vh, liteQuery.matches);

      if (target !== lastTarget) {
        if (lastTarget !== undefined) {
          rollBase += Math.PI * 2 * flourish;
          flourish = -flourish;
        }
        lastTarget = target;
      }
      if (pose.mode === 'hero') rollBase += dt * 0.6;

      const k = 1 - Math.exp(-dt * 3.2);
      current.x += (pose.x - current.x) * k;
      current.y += (pose.y - current.y) * k;
      current.length += (pose.length - current.length) * k;
      current.tilt += (pose.tilt - current.tilt) * k;
      current.opacity += (pose.opacity - current.opacity) * k;
      current.angle += wrapAngle(pose.angle - current.angle) * k;
      currentRoll += (rollBase + Math.sin(t * 0.6) * 0.25 - currentRoll) * k * 0.8;

      const thrust = pose.mode === 'point' ? Math.sin(t * 1.8) * 7 : 0;
      const px = current.x + (pose.dirX || 0) * thrust;
      const py = current.y + (pose.dirY || 0) * thrust + Math.sin(t * 0.8) * 4;

      const visibleWidth = visibleHeight * camera.aspect;
      aim.position.set((px / vw - 0.5) * visibleWidth, (0.5 - py / vh) * visibleHeight, 0);
      aim.rotation.z = current.angle + Math.sin(t * 0.3) * 0.02;
      aim.scale.setScalar((current.length / vh) * visibleHeight);
      tilt.rotation.x = current.tilt;
      roll.rotation.y = currentRoll;

      const fade = Math.min(1, (t - loadedAt) / FADE_IN_SECONDS);
      container.style.opacity = (current.opacity * fade).toFixed(3);
      renderer.render(scene, camera);
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
      disposed = true;
      stop();
      window.removeEventListener('resize', setSize);
      window.removeEventListener(SWORD_FOCUS_EVENT, onFocus);
      document.removeEventListener('visibilitychange', onVisibility);
      scene.traverse(obj => {
        obj.geometry?.dispose();
        const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
        materials.forEach(m => m?.dispose());
      });
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [modelUrl]);

  return (
    <div ref={containerRef} className={`sword-scene sword-scene--${status}`} aria-hidden="true">
      {status === 'missing' && import.meta.env.DEV && (
        <p className="sword-scene-hint">
          Falta el modelo 3D en <code>public/models/mea-culpa/mea-culpa.glb</code>
        </p>
      )}
    </div>
  );
};

export default SwordScene;
