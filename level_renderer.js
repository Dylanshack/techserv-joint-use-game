import { TILE_SIZE, LEVEL_ROWS, LEVEL_COLS, getTile } from './game_engine_core.js';

export function drawMap(ctx, cameraX) {
  for (let y = 0; y < LEVEL_ROWS; y++) {
    for (let x = 0; x < LEVEL_COLS; x++) {
      const tile = getTile(x, y);
      if (tile === 1) {
        ctx.fillStyle = '#654321';
        ctx.fillRect(x * TILE_SIZE - cameraX, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }
  }
}
