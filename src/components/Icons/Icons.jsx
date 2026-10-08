const toPath = grid =>
  grid
    .flatMap((row, y) => [...row].map((c, x) => (c === 'X' ? `M${x} ${y}h1v1h-1z` : '')))
    .join('');

const PixelIcon = ({ grid, className = '' }) => (
  <svg
    className={`pixel-icon ${className}`}
    viewBox={`0 0 ${grid[0].length} ${grid.length}`}
    shapeRendering="crispEdges"
    aria-hidden="true"
    focusable="false"
  >
    <path fill="currentColor" d={toPath(grid)} />
  </svg>
);

const CROSS = ['.XXXXX.', '..XXX..', 'X..X..X', 'XXXXXXX', 'X..X..X', '..XXX..', '.XXXXX.'];
const ARROW = ['...XXXX', '....XXX', '...XXXX', '..XXX.X', '.XXX...', 'XXX....', 'XX.....'];
const CHEVRON_LEFT = ['....XX', '...XX.', '..XX..', '.XX...', 'XX....', '.XX...', '..XX..', '...XX.', '....XX'];
const CHEVRON_RIGHT = CHEVRON_LEFT.map(row => [...row].reverse().join(''));

export const CrossIcon = ({ className }) => <PixelIcon grid={CROSS} className={className} />;
export const ArrowIcon = ({ className }) => <PixelIcon grid={ARROW} className={className} />;
export const ChevronLeft = ({ className }) => <PixelIcon grid={CHEVRON_LEFT} className={className} />;
export const ChevronRight = ({ className }) => <PixelIcon grid={CHEVRON_RIGHT} className={className} />;

export const GoldText = ({ as: Tag = 'span', className = '', children }) => (
  <Tag className={`gold-text ${className}`} data-text={children}>
    <span className="gold-text-fill">{children}</span>
  </Tag>
);
