import { player, GRAVITY, JUMP_FORCE, PLAYER_SPEED, checkCollision } from './game_engine_core.js';

const keys = {};
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

export function updatePlayer() {
  player.vx = 0;
  if (keys['ArrowLeft']) player.vx = -PLAYER_SPEED;
  if (keys['ArrowRight']) player.vx = PLAYER_SPEED;

  if (keys[' '] && player.grounded) {
    player.vy = JUMP_FORCE;
    player.grounded = false;
  }

  player.vy += GRAVITY;

  player.x += player.vx;
  const hTiles = checkCollision(player.x, player.y, player.width, player.height);
  hTiles.forEach(tile => {
    if (player.vx > 0 && player.x + player.width > tile.x && player.x < tile.x) {
      player.x = tile.x - player.width;
    } else if (player.vx < 0 && player.x < tile.x + 16 && player.x + player.width > tile.x + 16) {
      player.x = tile.x + 16;
    }
  });

  player.y += player.vy;
  player.grounded = false;
  const vTiles = checkCollision(player.x, player.y, player.width, player.height);
  vTiles.forEach(tile => {
    if (player.vy > 0 && player.y + player.height > tile.y && player.y < tile.y) {
      player.y = tile.y - player.height;
      player.vy = 0;
      player.grounded = true;
    } else if (player.vy < 0 && player.y < tile.y + 16 && player.y + player.height > tile.y + 16) {
      player.y = tile.y + 16;
      player.vy = 0;
    }
  });

  if (player.x < 0) player.x = 0;
  if (player.x > 3200 - player.width) player.x = 3200 - player.width;
}
