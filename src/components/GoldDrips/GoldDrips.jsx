import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { PixelArt } from '../Icons/Icons';
import './GoldDrips.css';

const PX = 2;
const MAX_LENGTH = 18;
const ROWS = MAX_LENGTH + 10;
const FALLING_DROPS = 3;
const GLINTS = 4;

const PALETTE = {
  W: '#fff4cf',
  H: '#f7d98a',
  G: '#dcae55',
  D: '#9c722b'
};

const seededRandom = seed => {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const buildDrips = (cols, seed) => {
  const random = seededRandom(seed);
  const grid = Array.from({ length: ROWS }, () => Array(cols).fill('.'));
  const set = (x, y, c) => {
    if (x >= 0 && x < cols && y >= 0 && y < ROWS) grid[y][x] = c;
  };
  const half = cols / 2;
  const taper = x => Math.max(0, 1 - Math.abs(x + 0.5 - half) / half);
  const phaseA = random() * 10;
  const phaseB = random() * 10;
  const wave = x => (Math.sin(x * 0.19 + phaseA) + Math.sin(x * 0.07 + phaseB) + 2) / 4;

  const pool = [];
  for (let x = 0; x < cols; x++) {
    const t = taper(x);
    const thickness = t < 0.04 ? 0 : 1 + Math.round(t * 3 * wave(x));
    pool.push(thickness);
    for (let y = 0; y < thickness; y++) {
      set(x, y, y === 0 ? 'H' : y === thickness - 1 ? 'D' : 'G');
    }
  }

  const drips = [];
  let x = 4 + Math.floor(random() * 6);
  while (x < cols - 4) {
    const t = taper(x);
    const length = Math.round(MAX_LENGTH * t ** 1.5 * random() ** 1.4);
    const width = t > 0.6 && length > 7 ? 3 : t > 0.3 && length > 3 ? 2 : 1;
    if (length > 0) drips.push({ x, length, width });
    x += Math.round(6 + random() * 9 + (1 - t) * 6);
  }

  for (const drip of drips) {
    const { x, length, width } = drip;
    const top = Math.max(1, pool[x]);
    const right = x + width - 1;
    const shade = dx => (width === 1 ? 'G' : dx === 0 ? 'H' : dx === width - 1 ? 'D' : 'G');

    for (let cx = x - 1; cx <= right + 1; cx++) {
      set(cx, top, cx === x - 1 || cx === right + 1 ? 'D' : 'G');
    }
    if (width === 3) {
      for (let cx = x - 2; cx <= right + 2; cx++) set(cx, top - 1, 'G');
    }

    const end = top + length;
    for (let y = top; y < end; y++) {
      for (let dx = 0; dx < width; dx++) set(x + dx, y, shade(dx));
    }

    if (width > 1 && length >= 4) {
      for (let dx = 0; dx < width; dx++) set(x + dx, end, shade(dx));
      for (let y = end + 1; y <= end + width; y++) {
        set(x - 1, y, y === end + 1 ? 'H' : 'G');
        for (let dx = 0; dx < width; dx++) set(x + dx, y, dx === 0 ? 'H' : 'G');
        set(right + 1, y, 'D');
      }
      set(x, end + 1, 'W');
      drip.glint = { x, y: end + 1 };
      for (let dx = 0; dx < width; dx++) set(x + dx, end + width + 1, 'D');
      drip.bottom = end + width + 2;
    } else {
      for (let dx = 0; dx < width; dx++) set(x + dx, end, 'D');
      drip.bottom = end + 1;
    }
  }

  const falling = drips
    .filter(drip => drip.width > 1)
    .sort((a, b) => b.length - a.length)
    .slice(0, FALLING_DROPS)
    .map(({ x, width, bottom }) => ({ left: (x + width / 2) * PX, top: bottom * PX }));

  for (let x = 2; x < cols - 2; x++) {
    if (grid[0][x] === 'H' && taper(x) > 0.25 && random() < 0.06) set(x, 0, 'W');
  }

  const glints = drips
    .filter(drip => drip.glint)
    .sort(() => random() - 0.5)
    .slice(0, GLINTS)
    .map(({ glint }) => ({ left: glint.x * PX, top: glint.y * PX }));

  return { grid: grid.map(row => row.join('')), falling, glints };
};

const GoldDrips = ({ seed = 1 }) => {
  const ref = useRef(null);
  const [cols, setCols] = useState(0);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const measure = () => setCols(Math.round(element.getBoundingClientRect().width / PX));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const art = useMemo(() => (cols > 8 ? buildDrips(cols, seed) : null), [cols, seed]);

  return (
    <div ref={ref} className="gold-drips" style={{ height: ROWS * PX }} aria-hidden="true">
      {art && (
        <>
          <PixelArt grid={art.grid} palette={PALETTE} className="gold-drips-art" />
          {art.falling.map(({ left, top }, index) => (
            <span
              key={left}
              className="gold-drips-drop"
              style={{ left, top, animationDelay: `${index * 2.4}s` }}
            />
          ))}
          {art.glints.map(({ left, top }, index) => (
            <span
              key={`${left}-${top}`}
              className="gold-drips-glint"
              style={{ left, top, animationDelay: `${index * 1.3}s` }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default GoldDrips;
