import { UNITS, LANE_LEFT_X, LANE_RIGHT_X } from '../config/constants';
import { spawnUnit } from './unitActions';

export const executeAiMove = (
  difficulty,
  currentElixir,
  unitsRef,
  setEnemyElixir,
  GAME_WIDTH,
  UNITS,
  spawnUnitCallback
) => {
  const units = unitsRef.current;

  const leftThreats = units.filter((u) => u.team === 'player' && u.x < GAME_WIDTH / 2);
  const rightThreats = units.filter((u) => u.team === 'player' && u.x >= GAME_WIDTH / 2);

  const leftDanger = leftThreats.reduce((sum, u) => sum + u.cost, 0);
  const rightDanger = rightThreats.reduce((sum, u) => sum + u.cost, 0);

  let laneX = null;
  let card = null;

  if (difficulty === 'EASY') {
    if (currentElixir > 6 && Math.random() > 0.6) {
      laneX = Math.random() > 0.5 ? LANE_LEFT_X : LANE_RIGHT_X;
      card = Math.random() > 0.5 ? 'ARCHER' : 'KNIGHT';
    }
  } else if (difficulty === 'MEDIUM') {
    if (leftDanger > 3 || rightDanger > 3) {
      const isLeft = leftDanger > rightDanger;
      laneX = isLeft ? LANE_LEFT_X : LANE_RIGHT_X;
      card = 'KNIGHT';
    } else if (currentElixir > 9) {
      laneX = Math.random() > 0.5 ? LANE_LEFT_X : LANE_RIGHT_X;
      card = 'GIANT';
    }
  } else if (difficulty === 'HARD') {
    if (leftDanger > 0 || rightDanger > 0) {
      const isLeft = leftDanger > rightDanger;
      laneX = isLeft ? LANE_LEFT_X : LANE_RIGHT_X;

      const threatUnits = isLeft ? leftThreats : rightThreats;
      const hasGiant = threatUnits.some((u) => u.key === 'GIANT');
      const hasSwarm = threatUnits.length > 1;

      if (hasGiant) card = 'KNIGHT';
      else if (hasSwarm) {
        card = 'FIREBALL';
        if (UNITS[card].type === 'spell') card = 'ARCHER';
      } else {
        card = 'ARCHER';
      }
    } else if (currentElixir > 8) {
      laneX = Math.random() > 0.5 ? LANE_LEFT_X : LANE_RIGHT_X;
      card = 'GIANT';
    }
  }

  if (card && laneX) {
    const cost = UNITS[card].cost;
    if (currentElixir >= cost) {
      spawnUnitCallback(card, 'enemy', laneX);
      setEnemyElixir((prev) => prev - cost);
    }
  }
};
