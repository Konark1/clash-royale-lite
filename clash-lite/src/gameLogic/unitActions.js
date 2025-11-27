import {
  GAME_WIDTH,
  GAME_HEIGHT,
  LANE_LEFT_X,
  LANE_RIGHT_X,
  BRIDGE_Y,
  TOWER_Y_ENEMY_KING,
  TOWER_Y_ENEMY_PRIN,
  TOWER_Y_PLAYER_PRIN,
  TOWER_Y_PLAYER_KING,
  UNITS,
} from '../config/constants';

export const createInitialTowers = () => {
  const kingStats = UNITS.KING_TOWER;
  const princessStats = UNITS.PRINCESS_TOWER;

  return {
    player: {
      king: {
        hp: kingStats.hp,
        maxHp: kingStats.hp,
        x: GAME_WIDTH / 2,
        y: TOWER_Y_PLAYER_KING,
        active: true,
        range: kingStats.range,
        dmg: kingStats.dmg,
        cooldown: 1000,
        lastAttack: 0,
        projectile: kingStats.projectile,
      },
      left: {
        hp: princessStats.hp,
        maxHp: princessStats.hp,
        x: LANE_LEFT_X,
        y: TOWER_Y_PLAYER_PRIN,
        active: true,
        range: princessStats.range,
        dmg: princessStats.dmg,
        cooldown: 800,
        lastAttack: 0,
        projectile: princessStats.projectile,
      },
      right: {
        hp: princessStats.hp,
        maxHp: princessStats.hp,
        x: LANE_RIGHT_X,
        y: TOWER_Y_PLAYER_PRIN,
        active: true,
        range: princessStats.range,
        dmg: princessStats.dmg,
        cooldown: 800,
        lastAttack: 0,
        projectile: princessStats.projectile,
      },
    },
    enemy: {
      king: {
        hp: kingStats.hp,
        maxHp: kingStats.hp,
        x: GAME_WIDTH / 2,
        y: TOWER_Y_ENEMY_KING,
        active: true,
        range: kingStats.range,
        dmg: kingStats.dmg,
        cooldown: 1000,
        lastAttack: 0,
        projectile: kingStats.projectile,
      },
      left: {
        hp: princessStats.hp,
        maxHp: princessStats.hp,
        x: LANE_LEFT_X,
        y: TOWER_Y_ENEMY_PRIN,
        active: true,
        range: princessStats.range,
        dmg: princessStats.dmg,
        cooldown: 800,
        lastAttack: 0,
        projectile: princessStats.projectile,
      },
      right: {
        hp: princessStats.hp,
        maxHp: princessStats.hp,
        x: LANE_RIGHT_X,
        y: TOWER_Y_ENEMY_PRIN,
        active: true,
        range: princessStats.range,
        dmg: princessStats.dmg,
        cooldown: 800,
        lastAttack: 0,
        projectile: princessStats.projectile,
      },
    },
  };
};

export const spawnUnit = (unitKey, team, x, y, unitsRef) => {
  const stats = UNITS[unitKey];
  if (stats.type === 'spell') return;
  const startY =
    y || (team === 'player' ? TOWER_Y_PLAYER_KING - 50 : TOWER_Y_ENEMY_KING + 50);

  unitsRef.current.push({
    id: Math.random(),
    key: unitKey,
    ...stats,
    team,
    x,
    y: startY,
    currentHp: stats.hp,
    state: 'WALKING',
    targetId: null,
  });
};

export const castSpell = (spellKey, x, y, projectilesRef, UNITS) => {
  const startX = GAME_WIDTH / 2;
  const startY = TOWER_Y_PLAYER_KING;

  projectilesRef.current.push({
    id: Math.random(),
    x: startX,
    y: startY,
    targetX: x,
    targetY: y,
    type: 'FIREBALL',
    speed: 15,
    dmg: UNITS[spellKey].dmg,
    radius: UNITS[spellKey].radius,
    team: 'player',
    isSpell: true,
  });
};
