import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import './SwordScene.css';

const CAMERA_DISTANCE = 10;
const CAMERA_FOV = 30;
const TURNS_PER_PAGE = 2;

const orientVertically = (model, pointDown) => {
  const size = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3());
  if (size.x >= size.y && size.x >= size.z) model.rotation.z = Math.PI / 2;
  else if (size.z >= size.y && size.z >= size.x) model.rotation.x = Math.PI / 2;
  if (pointDown) model.rotation.z += Math.PI;
};

const SwordScene = ({ modelUrl, pointDown = false, heightRatio = 0.82 }) => {
  const containerRef = useRef(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const container = containerRef.current;

    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const renderer = new THREE.WebGLRenderer({ antialias: !coarse, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1.25 : 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(CAMERA_FOV, 1, 0.1, 100);
    camera.position.set(0, 0, CAMERA_DISTANCE);

    scene.add(new THREE.HemisphereLight(0xffe2b0, 0x220808, 0.7));
    const key = new THREE.DirectionalLight(0xffd59a, 2.4);
    key.position.set(3, 5, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xff2a2a, 2);
    rim.position.set(-4, -2, -4);
    scene.add(rim);

    const spinner = new THREE.Group();
    scene.add(spinner);

    const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(CAMERA_FOV / 2)) * CAMERA_DISTANCE;
    let disposed = false;

    new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).load(
      modelUrl,
      gltf => {
        if (disposed) return;
        const model = gltf.scene;
        orientVertically(model, pointDown);

        const holder = new THREE.Group();
        holder.add(model);
        const box = new THREE.Box3().setFromObject(holder);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        model.position.sub(center);
        holder.scale.setScalar((visibleHeight * heightRatio) / size.y);

        spinner.add(holder);
        setStatus('ready');
      },
      undefined,
      () => {
        if (!disposed) setStatus('missing');
      }
    );

    const setSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    setSize();
    window.addEventListener('resize', setSize);

    const scrollProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? window.scrollY / max : 0;
    };

    let currentSpin = 0;
    let raf = 0;
    let frame = 0;
    const clock = new THREE.Clock();

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (coarse && frame++ % 2) return;
      const t = clock.getElapsedTime();
      const targetSpin = scrollProgress() * Math.PI * 2 * TURNS_PER_PAGE;
      currentSpin += (targetSpin - currentSpin) * 0.08;

      spinner.rotation.y = currentSpin + Math.sin(t * 0.4) * 0.15;
      spinner.rotation.z = Math.sin(t * 0.3) * 0.03;
      spinner.position.y = Math.sin(t * 0.8) * 0.06;

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
      document.removeEventListener('visibilitychange', onVisibility);
      scene.traverse(obj => {
        obj.geometry?.dispose();
        const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
        materials.forEach(m => m?.dispose());
      });
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [modelUrl, pointDown, heightRatio]);

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
