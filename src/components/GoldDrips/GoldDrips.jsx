import { PixelArt } from '../Icons/Icons';
import './GoldDrips.css';

const WIDTH = 64;
const HEIGHT = 18;

const PALETTE = {
  H: '#e3c47f',
  G: '#b8954f',
  D: '#7d5f28'
};

const DRIPS = [
  { x: 19, length: 2 },
  { x: 26, length: 6, bulb: true },
  { x: 32, length: 1 },
  { x: 38, length: 10, bulb: true },
  { x: 45, length: 3, bulb: true }
];

const LONGEST = DRIPS.reduce((a, b) => (b.length > a.length ? b : a));

const buildGrid = () => {
  const grid = Array.from({ length: HEIGHT }, () => Array(WIDTH).fill('.'));
  const set = (x, y, c) => {
    if (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) grid[y][x] = c;
  };

  for (let x = 12; x < 52; x++) set(x, 0, x > 18 && x < 46 ? 'H' : 'G');
  for (let x = 14; x < 50; x++) set(x, 1, x < 16 || x > 47 ? 'D' : 'G');

  for (const { x, length, bulb } of DRIPS) {
    for (let dx = -2; dx <= 3; dx++) set(x + dx, 2, dx === -2 || dx === 3 ? 'D' : 'G');
    for (let dx = -1; dx <= 2; dx++) set(x + dx, 3, dx === -1 || dx === 2 ? 'D' : 'G');

    const end = length + 3;
    for (let y = 3; y < end; y++) {
      set(x, y, 'H');
      set(x + 1, y, 'D');
    }

    if (bulb) {
      set(x, end, 'H');
      set(x + 1, end, 'G');
      set(x - 1, end + 1, 'G');
      set(x, end + 1, 'H');
      set(x + 1, end + 1, 'G');
      set(x + 2, end + 1, 'D');
      set(x - 1, end + 2, 'D');
      set(x, end + 2, 'G');
      set(x + 1, end + 2, 'G');
      set(x + 2, end + 2, 'D');
      set(x, end + 3, 'D');
      set(x + 1, end + 3, 'D');
    } else {
      set(x, end, 'G');
      set(x + 1, end, 'D');
    }
  }

  return grid.map(row => row.join(''));
};

const GRID = buildGrid();

const GoldDrips = ({ flip = false }) => (
  <div className={`gold-drips${flip ? ' gold-drips--flip' : ''}`} aria-hidden="true">
    <PixelArt grid={GRID} palette={PALETTE} className="gold-drips-art" />
    <span className="gold-drips-drop" style={{ '--drop-x': `${((LONGEST.x + 0.5) / WIDTH) * 100}%`, '--drop-y': `${((LONGEST.length + 7) / HEIGHT) * 100}%` }} />
  </div>
);

export default GoldDrips;
