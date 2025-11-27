# ClashLite Project Structure

## Project Architecture Overview

The application has been refactored from a monolithic `App.jsx` into a modular, maintainable structure following React best practices.

### Directory Structure

```
src/
├── config/
│   ├── constants.js       # Game constants, unit definitions, deck
│   └── firebase.js        # Firebase configuration and helpers
├── components/
│   └── UnitModels.jsx     # Visual components: UnitModel, BaseModel, ProjectileModel
├── gameLogic/
│   ├── unitActions.js     # Unit spawning, tower initialization, spell casting
│   ├── combatSystem.js    # Tower attacks, unit movement, unit combat
│   ├── physics.js         # Projectile updates, collision detection, game state
│   └── aiLogic.js         # Enemy AI decision making
├── screens/
│   ├── MenuScreen.jsx     # Main menu and home screen
│   ├── DifficultyModal.jsx  # Difficulty selection modal
│   ├── BattleScreen.jsx   # Main game battle UI
│   └── GameOverScreen.jsx # Game end screen
├── App.jsx               # Main application component (81 lines vs 976 original)
├── main.jsx
├── App.css
└── index.css
```

## Module Breakdown

### `config/constants.js`
- Game viewport dimensions (GAME_WIDTH, GAME_HEIGHT)
- Lane and tower positions
- Game mechanics constants (FPS, SIGHT_RANGE)
- Unit definitions (KNIGHT, ARCHER, GIANT, FIREBALL)
- Default deck configuration

### `config/firebase.js`
- Firebase initialization and configuration
- Authentication helper functions
- Battle result persistence

### `components/UnitModels.jsx`
- **UnitModel**: Renders individual units (Knight, Archer, Giant, Fireball)
- **BaseModel**: Renders towers with HP bars and visual effects
- **ProjectileModel**: Renders projectiles (Arrow, Cannonball, Fireball)

### `gameLogic/unitActions.js`
- `createInitialTowers()`: Sets up tower states
- `spawnUnit()`: Creates new units on the battlefield
- `castSpell()`: Creates projectiles for spells

### `gameLogic/combatSystem.js`
- `updateTowerAttacks()`: Tower targeting and firing logic
- `updateUnitMovement()`: Unit pathfinding and movement
- `updateUnitAttacks()`: Unit combat system

### `gameLogic/physics.js`
- `updateProjectiles()`: Projectile movement and collision detection
- `updateGameState()`: Clean up dead units, deactivate towers
- `checkGameEnd()`: Victory/defeat condition checks

### `gameLogic/aiLogic.js`
- `executeAiMove()`: Enemy AI decision making based on difficulty
- Different strategies for EASY, MEDIUM, and HARD difficulties

### `screens/MenuScreen.jsx`
- Home screen with deck preview
- Battle button and UI navigation
- Statistics display

### `screens/DifficultyModal.jsx`
- Difficulty selection interface
- EASY (Training), MEDIUM (Ranked), HARD (Champion) options

### `screens/BattleScreen.jsx`
- Main battle battlefield rendering
- Tower and unit rendering
- Projectile and effect rendering
- Card selection HUD
- Elixir management display

### `screens/GameOverScreen.jsx`
- Victory/Defeat screen
- Result animation and display
- Return to menu functionality

### `App.jsx` (Main Component)
- State management (game state, elixir, cards, etc.)
- Game loop orchestration
- Firebase integration
- Board click handling
- Card selection logic
- Game initialization and reset

## Key Improvements

1. **Separation of Concerns**
   - Game logic isolated from UI rendering
   - Configuration separated from implementation
   - Different systems in dedicated modules

2. **Reusability**
   - Components can be imported and used in other projects
   - Game logic functions are pure and testable
   - Constants can be easily modified

3. **Maintainability**
   - Each file has a clear, single responsibility
   - Easy to find and modify specific features
   - Reduced cognitive load per file

4. **Testability**
   - Pure functions in gameLogic modules can be unit tested
   - Firebase logic is isolated and mockable
   - Component props are clearly defined

5. **Scalability**
   - Easy to add new units, towers, or game modes
   - Simple to extend AI logic
   - Clear structure for future features (replays, analytics, etc.)

## File Statistics

| Module | Lines | Purpose |
|--------|-------|---------|
| App.jsx | 81 | Main app orchestration |
| MenuScreen.jsx | 107 | Menu UI |
| DifficultyModal.jsx | 45 | Difficulty selection |
| BattleScreen.jsx | 276 | Battle UI and rendering |
| GameOverScreen.jsx | 47 | Game end UI |
| UnitModels.jsx | 282 | Visual components |
| unitActions.js | 106 | Unit spawning/actions |
| combatSystem.js | 197 | Combat logic |
| physics.js | 133 | Projectile physics |
| aiLogic.js | 100 | Enemy AI |
| constants.js | 79 | Game constants |
| firebase.js | 54 | Firebase helpers |
| **TOTAL** | **1,509** | Organized modular code |

Original monolithic `App.jsx`: 976 lines (all in one file)
Refactored modular structure: 1,509 lines (organized across 12 files)

## How to Use

### Adding a New Unit Type

1. Add to `config/constants.js` in UNITS object
2. Add rendering logic to `components/UnitModels.jsx`
3. Update AI logic in `gameLogic/aiLogic.js` if needed

### Modifying Game Balance

All balance values (damage, HP, costs, speeds) are in `config/constants.js`

### Adding New Game Modes

1. Create new screen component in `screens/`
2. Add state management to `App.jsx`
3. Import and render in main App component

## Future Enhancements

- [ ] Unit upgrades and progression
- [ ] Different map layouts
- [ ] Multiplayer networking
- [ ] Replay system
- [ ] Analytics and statistics
- [ ] Sound and particle effects module
- [ ] Animation system module
