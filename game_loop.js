// Game Loop with Victory, Collision, and Quiz Triggers

import { canvas, ctx, player, camera } from './game_engine_core.js';
import { updatePlayer } from './player_controller.js';
import { drawMap } from './level_renderer.js';
import { updateEnemies, drawEnemies, enemies } from './enemy_ai.js';

const checkpoints = [
  { x: 600, triggered: false, question: 'What is required before attaching to a pole?', answer: 'permit' },
  { x: 1600, triggered: false, question: 'Which tool scans QR codes?', answer: 'qr scanner' }
];

function drawPlayer() {
  const px = player.x - camera.x;
  ctx.fillStyle = '#fff';
  ctx.fillRect(px, player.y, player.width, player.height);
  ctx.fillStyle = '#ff0';
  ctx.fillRect(px + 2, player.y + 2, 10, 6); // helmet
}

function checkVictory() {
  if (player.x > 3184) {
    alert("✅ Inspection complete! Level cleared.");
    window.location.reload();
  }
}

function checkEnemyCollision() {
  enemies.forEach(enemy => {
    if (!enemy.active) return;
    const px = player.x;
    const py = player.y;
    if (
      px < enemy.x + enemy.width &&
      px + player.width > enemy.x &&
      py < enemy.y + enemy.height &&
      py + player.height > enemy.y
    ) {
      if (player.vy > 0) {
        enemy.active = false;
        player.vy = -6;
      } else {
        alert("⚡ You were zapped by a live line! Restarting level...");
        window.location.reload();
      }
    }
  });
}

function checkCheckpoints() {
  checkpoints.forEach(cp => {
    if (!cp.triggered && Math.abs(player.x - cp.x) < 20) {
      cp.triggered = true;
      const userAnswer = prompt(cp.question);
      if (userAnswer && userAnswer.toLowerCase().trim() === cp.answer) {
        alert("✅ Correct!");
      } else {
        alert("❌ Incorrect. Study your Joint Use Manual!");
      }
    }
  });
}

function gameLoop() {
  updatePlayer();
  updateEnemies();
  checkVictory();
  checkEnemyCollision();
  checkCheckpoints();

  camera.x = Math.max(0, Math.min(player.x - canvas.width / 2, 3200 - canvas.width));
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap(ctx, camera.x);
  drawEnemies(ctx, camera.x);
  drawPlayer();

  requestAnimationFrame(gameLoop);
}

gameLoop();
