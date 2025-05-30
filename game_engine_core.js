export const TILE_SIZE = 16;
export const LEVEL_ROWS = 15;
export const LEVEL_COLS = 200;
export const GRAVITY = 0.5;
export const PLAYER_SPEED = 2;
export const JUMP_FORCE = -9;

export const player = {
  x: 32,
  y: 160,
  vx: 0,
  vy: 0,
  width: 14,
  height: 16,
  grounded: false
};

export const camera = { x: 0 };

export const canvas = document.getElementById('game');
export const ctx = canvas.getContext('2d');

export const levelMap = new Array(LEVEL_COLS * LEVEL_ROWS).fill(0);
for (let y = LEVEL_ROWS - 2; y < LEVEL_ROWS; y++) {
  for (let x = 0; x < LEVEL_COLS; x++) {
    levelMap[y * LEVEL_COLS + x] = 1;
  }
}

export function getTile(x, y) {
  if (x < 0 || y < 0 || x >= LEVEL_COLS || y >= LEVEL_ROWS) return 0;
  return levelMap[y * LEVEL_COLS + x];
}

export function isSolid(x, y) {
  return getTile(x, y) !== 0;
}

export function checkCollision(px, py, w, h) {
  const tiles = [];
  const left = Math.floor(px / TILE_SIZE);
  const right = Math.floor((px + w) / TILE_SIZE);
  const top = Math.floor(py / TILE_SIZE);
  const bottom = Math.floor((py + h) / TILE_SIZE);
  for (let y = top; y <= bottom; y++) {
    for (let x = left; x <= right; x++) {
      if (isSolid(x, y)) tiles.push({ x: x * TILE_SIZE, y: y * TILE_SIZE });
    }
  }
  return tiles;
}
