import { TILE_SIZE, checkCollision } from './game_engine_core.js';

export const enemies = [
  { x: 400, y: 192, width: 14, height: 16, vx: 1, direction: 1, active: true },
  { x: 1200, y: 192, width: 14, height: 16, vx: 1, direction: -1, active: true },
  { x: 1800, y: 192, width: 14, height: 16, vx: 1, direction: 1, active: true }
];

export function updateEnemies() {
  enemies.forEach(enemy => {
    if (!enemy.active) return;
    enemy.x += enemy.vx * enemy.direction;
    const aheadX = enemy.direction > 0 ? enemy.x + enemy.width : enemy.x - 1;
    const below = checkCollision(aheadX, enemy.y + enemy.height + 1, enemy.width, 1);
    if (below.length === 0) {
      enemy.direction *= -1;
    }
  });
}

export function drawEnemies(ctx, cameraX) {
  enemies.forEach(enemy => {
    if (!enemy.active) return;
    const px = enemy.x - cameraX;
    ctx.fillStyle = '#003f87';
    ctx.beginPath();
    ctx.moveTo(px + 7, enemy.y);
    ctx.lineTo(px + 14, enemy.y + 6);
    ctx.lineTo(px + 10, enemy.y + 6);
    ctx.lineTo(px + 16, enemy.y + 16);
    ctx.lineTo(px + 8, enemy.y + 12);
    ctx.lineTo(px + 10, enemy.y + 16);
    ctx.lineTo(px, enemy.y + 8);
    ctx.closePath();
    ctx.fill();
  });
}
