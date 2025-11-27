import { TOWER_Y_PLAYER_KING, TOWER_Y_ENEMY_KING } from '../config/constants';

/**
 * Scoring System:
 * - Each Princess Tower destroyed = 1 star
 * - King Tower destroyed = 3 stars (instant win)
 * - Winner determined by most stars if time runs out
 */

export const calculateStars = (towersRef) => {
  const playerStars = countPlayerStars(towersRef);
  const enemyStars = countEnemyStars(towersRef);
  
  return { playerStars, enemyStars };
};

const countPlayerStars = (towersRef) => {
  const towers = towersRef.current.enemy;
  let stars = 0;

  // King tower destroyed = 3 stars
  if (!towers.king.active) return 3;

  // Count destroyed princess towers
  if (!towers.left.active) stars++;
  if (!towers.right.active) stars++;

  return Math.min(stars, 2);
};

const countEnemyStars = (towersRef) => {
  const towers = towersRef.current.player;
  let stars = 0;

  // King tower destroyed = 3 stars
  if (!towers.king.active) return 3;

  // Count destroyed princess towers
  if (!towers.left.active) stars++;
  if (!towers.right.active) stars++;

  return Math.min(stars, 2);
};

/**
 * Check if either side has destroyed the opponent's king
 * @returns 'VICTORY' if player destroyed enemy king, 'DEFEAT' if enemy destroyed player king, null otherwise
 */
export const checkKingTowerDestroyed = (towersRef) => {
  if (towersRef.current.enemy.king.hp <= 0) {
    return 'VICTORY';
  }
  if (towersRef.current.player.king.hp <= 0) {
    return 'DEFEAT';
  }
  return null;
};

/**
 * Determine winner based on stars when time runs out
 * @returns 'VICTORY', 'DEFEAT', or 'DRAW'
 */
export const determineWinnerByStars = (towersRef) => {
  const { playerStars, enemyStars } = calculateStars(towersRef);

  if (playerStars > enemyStars) return 'VICTORY';
  if (enemyStars > playerStars) return 'DEFEAT';
  return 'DRAW';
};

/**
 * Get formatted star display
 * @param stars - number of stars (0-3)
 * @returns string of star symbols
 */
export const getStarDisplay = (stars) => {
  const starSymbol = '⭐';
  return starSymbol.repeat(Math.min(stars, 3));
};
