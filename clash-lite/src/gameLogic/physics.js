import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants';

// Update projectiles and handle collision
export const updateProjectiles = (
  projectilesRef,
  unitsRef,
  towersRef,
  hitEffectsRef
) => {
  const activeProjectiles = [];

  projectilesRef.current.forEach((p) => {
    let tx = p.targetX;
    let ty = p.targetY;

    if (!p.isSpell) {
      const targetUnit = unitsRef.current.find((u) => u.id === p.targetId);
      if (targetUnit) {
        tx = targetUnit.x;
        ty = targetUnit.y;
      } else if (p.targetType === 'tower') {
        const t = towersRef.current[p.targetTeam][p.targetKey];
        tx = t.x;
        ty = t.y;
      }
    }

    const dx = tx - p.x;
    const dy = ty - p.y;
    const dist = Math.hypot(dx, dy);

    if (dist < p.speed) {
      // Projectile hit
      if (p.isSpell) {
        hitEffectsRef.current.push({
          x: tx,
          y: ty,
          type: 'EXPLOSION',
          duration: 10,
        });

        unitsRef.current.forEach((u) => {
          const distToHit = Math.hypot(u.x - tx, u.y - ty);
          if (distToHit < p.radius) u.currentHp -= p.dmg;
        });

        const allTowers = [
          ...Object.values(towersRef.current.player),
          ...Object.values(towersRef.current.enemy),
        ];
        allTowers.forEach((t) => {
          if (!t.active) return;
          const distToHit = Math.hypot(t.x - tx, t.y - ty);
          if (distToHit < p.radius + 20) t.hp -= p.dmg;
        });
      } else {
        const targetUnit = unitsRef.current.find((u) => u.id === p.targetId);
        if (targetUnit) {
          targetUnit.currentHp -= p.dmg;
          hitEffectsRef.current.push({
            x: tx,
            y: ty,
            type: 'HIT',
            duration: 5,
          });
        } else if (p.targetType === 'tower') {
          const t = towersRef.current[p.targetTeam][p.targetKey];
          if (t.active) {
            t.hp -= p.dmg;
            hitEffectsRef.current.push({
              x: tx,
              y: ty,
              type: 'HIT',
              duration: 5,
            });
          }
        } else {
          hitEffectsRef.current.push({
            x: tx,
            y: ty,
            type: 'HIT',
            duration: 5,
          });
        }
      }
    } else {
      p.x += (dx / dist) * p.speed;
      p.y += (dy / dist) * p.speed;
      activeProjectiles.push(p);
    }
  });

  projectilesRef.current = activeProjectiles;
};

// Deactivate destroyed towers and clean up
export const updateGameState = (unitsRef, towersRef, hitEffectsRef) => {
  // Remove dead units
  unitsRef.current = unitsRef.current.filter((u) => u.currentHp > 0);

  // Deactivate destroyed towers
  ['player', 'enemy'].forEach((team) => {
    const towers = towersRef.current[team];
    ['left', 'right', 'king'].forEach((key) => {
      if (towers[key].active && towers[key].hp <= 0) {
        towers[key].active = false;
        towers[key].hp = 0;
      }
    });
  });

  // Clean up expired hit effects
  hitEffectsRef.current = hitEffectsRef.current.filter((h) => h.duration-- > 0);
};

// Check for game end conditions
export const checkGameEnd = (towersRef) => {
  // King tower destroyed = instant win
  if (towersRef.current.enemy.king.hp <= 0) return 'VICTORY';
  if (towersRef.current.player.king.hp <= 0) return 'DEFEAT';
  return null;
};
