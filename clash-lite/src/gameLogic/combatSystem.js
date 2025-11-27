import { GAME_WIDTH, GAME_HEIGHT, LANE_LEFT_X, LANE_RIGHT_X, BRIDGE_Y, SIGHT_RANGE, UNITS } from '../config/constants';

// Tower attack logic
export const updateTowerAttacks = (towersRef, unitsRef, projectilesRef) => {
  const now = Date.now();

  ['player', 'enemy'].forEach((team) => {
    const enemyTeam = team === 'player' ? 'enemy' : 'player';
    const myTowers = towersRef.current[team];

    ['king', 'left', 'right'].forEach((type) => {
      const tower = myTowers[type];
      if (!tower.active) return;

      let target = null;
      let minDist = tower.range;

      unitsRef.current.forEach((u) => {
        if (u.team === enemyTeam) {
          const dist = Math.hypot(u.x - tower.x, u.y - tower.y);
          if (dist < minDist) {
            minDist = dist;
            target = u;
          }
        }
      });

      if (target && now - tower.lastAttack > tower.cooldown) {
        tower.lastAttack = now;
        projectilesRef.current.push({
          id: Math.random(),
          x: tower.x,
          y: tower.y,
          targetId: target.id,
          targetX: target.x,
          targetY: target.y,
          type: tower.projectile,
          speed: 12,
          dmg: tower.dmg,
          team: team,
        });
      }
    });
  });
};

// Update unit movement
export const updateUnitMovement = (unitsRef, towersRef) => {
  const units = unitsRef.current;

  units.forEach((u) => {
    if (u.state === 'ATTACKING') return;

    let targetX, targetY;
    let aggroTarget = null;
    let minAggroDist = Infinity;

    const isDefending = (u.team === 'player' && u.y > BRIDGE_Y) || (u.team === 'enemy' && u.y < BRIDGE_Y);
    const activeSightRange = isDefending ? SIGHT_RANGE * 1.5 : SIGHT_RANGE;

    if (u.type !== 'building_target') {
      units.forEach((enemy) => {
        if (u.team === enemy.team) return;
        const dist = Math.hypot(u.x - enemy.x, u.y - enemy.y);
        if (dist < activeSightRange && dist < minAggroDist) {
          minAggroDist = dist;
          aggroTarget = enemy;
        }
      });
    }

    if (aggroTarget) {
      targetX = aggroTarget.x;
      targetY = aggroTarget.y;
    } else {
      const enemyTeam = u.team === 'player' ? 'enemy' : 'player';
      const towers = towersRef.current[enemyTeam];
      let closestTower = null;
      let minTowerDist = Infinity;

      ['left', 'right', 'king'].forEach((key) => {
        const t = towers[key];
        if (t.active) {
          const dist = Math.hypot(u.x - t.x, u.y - t.y);
          if (dist < minTowerDist) {
            minTowerDist = dist;
            closestTower = t;
          }
        }
      });

      if (closestTower) {
        targetX = closestTower.x;
        targetY = closestTower.y;
      } else {
        targetX = GAME_WIDTH / 2;
        targetY = u.team === 'player' ? 0 : GAME_HEIGHT;
      }
    }

    // Bridge pathfinding
    const RIVER_TOP = BRIDGE_Y - 55;
    const RIVER_BOTTOM = BRIDGE_Y + 55;
    const isGoingSouth = targetY > u.y;

    const needsToCross =
      (u.y < RIVER_TOP && targetY > RIVER_TOP) ||
      (u.y > RIVER_BOTTOM && targetY < RIVER_BOTTOM);
    const inRiver = u.y >= RIVER_TOP && u.y <= RIVER_BOTTOM;

    if (needsToCross || inRiver) {
      const distLeft = Math.abs(u.x - LANE_LEFT_X);
      const distRight = Math.abs(u.x - LANE_RIGHT_X);
      const bridgeX = distLeft < distRight ? LANE_LEFT_X : LANE_RIGHT_X;

      const isAligned = Math.abs(u.x - bridgeX) < 5;

      if (!isAligned && !inRiver) {
        targetX = bridgeX;
        targetY = isGoingSouth ? RIVER_TOP + 10 : RIVER_BOTTOM - 10;
      } else {
        targetX = bridgeX;
        if (inRiver) {
          targetY = isGoingSouth ? RIVER_BOTTOM + 20 : RIVER_TOP - 20;
        }
      }
    }

    const dx = targetX - u.x;
    const dy = targetY - u.y;
    const dist = Math.hypot(dx, dy);

    if (dist > 5) {
      const moveX = (dx / dist) * u.speed;
      const moveY = (dy / dist) * u.speed;
      u.x += moveX;
      u.y += moveY;
    }
  });
};

// Update unit attacks
export const updateUnitAttacks = (unitsRef, towersRef, projectilesRef, hitEffectsRef) => {
  const units = unitsRef.current;

  units.forEach((u) => {
    let target = null;
    let minDist = Infinity;

    units.forEach((enemy) => {
      if (u.team === enemy.team) return;
      const dist = Math.hypot(u.x - enemy.x, u.y - enemy.y);
      if (dist < u.range && dist < minDist) {
        minDist = dist;
        target = enemy;
      }
    });

    if (!target) {
      const enemyTeam = u.team === 'player' ? 'enemy' : 'player';
      const towers = towersRef.current[enemyTeam];
      ['left', 'right', 'king'].forEach((key) => {
        const t = towers[key];
        if (t.active) {
          const dist = Math.hypot(u.x - t.x, u.y - t.y);
          const hitRadius = key === 'king' ? 50 : 40;
          if (dist < u.range + hitRadius && dist < minDist) {
            minDist = dist;
            target = { type: 'tower', team: enemyTeam, key: key, x: t.x, y: t.y };
          }
        }
      });
    }

    if (target) {
      u.state = 'ATTACKING';
      if (Math.random() < 0.15) {
        if (u.attackType === 'RANGED') {
          let tx = target.x;
          let ty = target.y;
          projectilesRef.current.push({
            id: Math.random(),
            x: u.x,
            y: u.y,
            targetId: target.id || 'tower',
            targetType: target.type,
            targetTeam: target.team,
            targetKey: target.key,
            targetX: tx,
            targetY: ty,
            type: u.projectile,
            speed: u.projectileSpeed || 10,
            dmg: u.dmg,
            team: u.team,
          });
        } else {
          hitEffectsRef.current.push({
            x: u.x + (Math.random() * 20 - 10),
            y: u.y + (u.team === 'player' ? -20 : 20),
            type: 'SLASH',
            duration: 3,
          });
          if (target.type === 'tower') {
            towersRef.current[target.team][target.key].hp -= u.dmg;
          } else {
            target.currentHp -= u.dmg;
          }
        }
      }
    } else {
      u.state = 'WALKING';
    }
  });
};
