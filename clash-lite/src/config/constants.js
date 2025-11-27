// --- CLASH ROYALE GRID CONSTANTS ---
// The real game uses a tile system. We scale this to our Canvas.

export const TILE_SIZE = 25; // 1 Tile = 25px
export const GRID_WIDTH = 18; // Standard CR width
export const GRID_HEIGHT = 32; // Standard CR height

// Canvas Dimensions based on Grid
export const GAME_WIDTH = TILE_SIZE * GRID_WIDTH; // 450px
export const GAME_HEIGHT = TILE_SIZE * GRID_HEIGHT; // 800px

// --- CALCULATED PLACEMENTS ---

// River is exactly in the middle (Rows 16-17)
export const RIVER_TOP_Y = (GRID_HEIGHT / 2 - 1) * TILE_SIZE; // Y=375
export const RIVER_BOTTOM_Y = (GRID_HEIGHT / 2 + 1) * TILE_SIZE; // Y=425
export const BRIDGE_Y = GAME_HEIGHT / 2; // Center Y=400

// Lanes are typically centered at Tile 3.5 (Left) and Tile 14.5 (Right)
export const LANE_LEFT_X = 3.5 * TILE_SIZE; // 87.5px
export const LANE_RIGHT_X = 14.5 * TILE_SIZE; // 362.5px

// --- TOWER POSITIONS (Measured from River/Center) ---

// Princess Towers: ~6.5 tiles from the river
export const TOWER_Y_ENEMY_PRIN = BRIDGE_Y - (6.5 * TILE_SIZE); // Y=237.5
export const TOWER_Y_PLAYER_PRIN = BRIDGE_Y + (6.5 * TILE_SIZE); // Y=562.5

// King Towers: ~13 tiles from the river
export const TOWER_Y_ENEMY_KING = BRIDGE_Y - (13 * TILE_SIZE); // Y=75
export const TOWER_Y_PLAYER_KING = BRIDGE_Y + (13 * TILE_SIZE); // Y=725

// --- LOGIC CONSTANTS ---
export const BRIDGE_WIDTH = 3 * TILE_SIZE; // Bridges are 3 tiles wide
export const SIGHT_RANGE = 5.5 * TILE_SIZE; // Standard aggro range is ~5.5 tiles
export const DEPLOY_ZONE_HEIGHT = 14 * TILE_SIZE; // You can deploy up to the bridge
export const FPS = 30;

// Unit definitions
export const UNITS = {
  PRINCESS_TOWER: {
    name: 'Princess Tower',
    hp: 2534,
    dmg: 90,
    speed: 0, // Stationary
    color: 'bg-gray-300',
    range: 220, // TOWER_RANGE
    type: 'building',
    attackType: 'RANGED',
    projectile: 'ARROW',
    projectileSpeed: 15,
    rarity: 'Common'
  },

  KING_TOWER: {
    name: 'King Tower',
    hp: 4008,
    dmg: 90,
    speed: 0, // Stationary
    color: 'bg-gray-400',
    range: 250, // Slightly longer range than Princess
    type: 'building',
    attackType: 'RANGED',
    projectile: 'CANNONBALL',
    projectileSpeed: 15,
    rarity: 'Common'
  },

  MINIONS: { 
    name: 'Minions', 
    cost: 3, 
    hp: 190, 
    dmg: 84, 
    speed: 4, // Fast
    color: 'bg-blue-400', 
    range: 40, 
    type: 'flying', // Unique type
    attackType: 'MELEE',
    rarity: 'Common'
  },

  MUSKETEER: { 
    name: 'Musketeer', 
    cost: 4, 
    hp: 598, 
    dmg: 181, 
    speed: 2, // Medium
    color: 'bg-purple-600', 
    range: 180, // Long range
    type: 'ground', 
    attackType: 'RANGED', 
    projectile: 'CANNONBALL', // Reusing cannonball for bullet
    projectileSpeed: 18,
    rarity: 'Rare'
  },

  PEKKA: { 
    name: 'P.E.K.K.A', 
    cost: 7, 
    hp: 3000, // Tank
    dmg: 600, // High damage
    speed: 1, // Slow
    color: 'bg-gray-800', 
    range: 40, 
    type: 'ground', 
    attackType: 'MELEE',
    rarity: 'Epic'
  },

  GOBLIN: { 
    name: 'Goblins', 
    cost: 2, 
    hp: 160, 
    dmg: 90, 
    speed: 5, // Very Fast
    color: 'bg-green-500', 
    range: 30, 
    type: 'ground', 
    attackType: 'MELEE',
    rarity: 'Common'
  },

  KNIGHT: { 
    name: 'Knight', 
    cost: 3, 
    hp: 1450, 
    dmg: 160, 
    speed: 2, // Medium
    color: 'bg-blue-500', 
    range: 40, 
    type: 'ground', 
    attackType: 'MELEE', 
    rarity: 'Common'
  },

  ARCHER: { 
    name: 'Archers', 
    cost: 3, 
    hp: 252, 
    dmg: 89, 
    speed: 2.5, // Medium-Fast
    color: 'bg-green-500', 
    range: 120, 
    type: 'ground', 
    attackType: 'RANGED', 
    projectile: 'ARROW', 
    projectileSpeed: 12,
    rarity: 'Common'
  },

  GIANT: { 
    name: 'Giant', 
    cost: 5, 
    hp: 3275, 
    dmg: 211, 
    speed: 1, // Slow
    color: 'bg-orange-600', 
    range: 40, 
    type: 'building_target', 
    attackType: 'MELEE', 
    rarity: 'Rare' 
  },

  FIREBALL: { 
    name: 'Fireball', 
    cost: 4, 
    type: 'spell', 
    dmg: 572, 
    radius: 100, 
    color: 'bg-red-500',
    rarity: 'Rare' 
  }
};

// Default deck - 8 cards (7 troops + 1 spell)
export const DECK = ['GOBLIN', 'KNIGHT', 'ARCHER', 'MINIONS', 'GIANT', 'MUSKETEER', 'PEKKA', 'FIREBALL'];
