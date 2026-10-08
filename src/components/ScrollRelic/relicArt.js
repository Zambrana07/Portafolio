export const RELIC_PALETTE = {
  O: '#140d05',
  H: '#e8d48a',
  G: '#a8924a',
  D: '#6b5a28',
  S: '#2a1f0e'
};

export const CENSER = [
  '.....O.....',
  '....OHO....',
  '....OGO....',
  '...OHGDO...',
  '....ODO....',
  '...OOOOO...',
  '..OHGGGDO..',
  '..OGSGSDO..',
  '.OHGSGSGDO.',
  '.OGSGSGSDO.',
  'OOOOOOOOOOO',
  'OHGGGGGGGDO',
  'OGSGSGSGSDO',
  'OOOOOOOOOOO',
  '.OHGGGGGDO.',
  '.OGSGGGSDO.',
  '.OGGGSGGDO.',
  '.OGGSSSGDO.',
  '..OHGGGDO..',
  '...OGGDO...',
  '....OGO....',
  '.....O.....'
];

export const CENSER_SIDEWAYS = CENSER[0].split('').map((_, x) => CENSER.map(row => row[x]).join(''));

export const KNOT = ['...O...', '..OHO..', '.OG.DO.', 'OG...DO', '.OG.DO.', '..ODO..', '...O...'];
