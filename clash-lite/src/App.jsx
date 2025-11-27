import React, { useState, useEffect, useRef } from 'react';
import { GAME_WIDTH, GAME_HEIGHT, FPS, UNITS, DECK } from './config/constants';
import { initializeFirebaseAuth, saveBattleResult } from './config/firebase';
import { MenuScreen } from './screens/MenuScreen';
import { CardsScreen } from './screens/CardsScreen';
import { ShopScreen } from './screens/ShopScreen';
import { ClansScreen } from './screens/ClansScreen';
import { DifficultyModal } from './screens/DifficultyModal';
import { BattleScreen } from './screens/BattleScreen';
import { GameOverScreen } from './screens/GameOverScreen';
import { createInitialTowers, spawnUnit, castSpell } from './gameLogic/unitActions';
import { updateTowerAttacks, updateUnitMovement, updateUnitAttacks } from './gameLogic/combatSystem';
import { updateProjectiles, updateGameState, checkGameEnd } from './gameLogic/physics';
import { executeAiMove } from './gameLogic/aiLogic';
import { calculateStars, determineWinnerByStars, checkKingTowerDestroyed } from './gameLogic/scoringSystem';

export default function App() {
  const [user, setUser] = useState(null);
  const [gameState, setGameState] = useState('MENU');
  const [difficulty, setDifficulty] = useState('MEDIUM');
  const [elixir, setElixir] = useState(5);
  const [enemyElixir, setEnemyElixir] = useState(5);
  const [selectedCard, setSelectedCard] = useState(null);
  const [hand, setHand] = useState([0, 1, 2, 3]);
  const [nextCardIndex, setNextCardIndex] = useState(4);
  const [invalidPlacement, setInvalidPlacement] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);

  const unitsRef = useRef([]);
  const projectilesRef = useRef([]);
  const hitEffectsRef = useRef([]);
  const towersRef = useRef(createInitialTowers());

  const [renderTrigger, setRenderTrigger] = useState(0);
  const [gameResult, setGameResult] = useState(null);

  // Initialize Firebase
  useEffect(() => {
    initializeFirebaseAuth(setUser);
  }, []);

  // Game loop and AI
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const interval = setInterval(updateGame, 1000 / FPS);

    const elixirInterval = setInterval(() => {
      setElixir((prev) => Math.min(prev + 0.1, 10));
      setEnemyElixir((prev) => Math.min(prev + 0.1, 10));
    }, 200);

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame('DRAW');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const aiThinkRate = difficulty === 'HARD' ? 500 : difficulty === 'EASY' ? 2500 : 1500;
    const aiInterval = setInterval(executeAiMoveWrapper, aiThinkRate);

    return () => {
      clearInterval(interval);
      clearInterval(elixirInterval);
      clearInterval(aiInterval);
      clearInterval(timerInterval);
    };
  }, [gameState, difficulty]);

  const aiElixirRef = useRef(5);
  useEffect(() => {
    aiElixirRef.current = enemyElixir;
  }, [enemyElixir]);

  const executeAiMoveWrapper = () => {
    executeAiMove(
      difficulty,
      aiElixirRef.current,
      unitsRef,
      setEnemyElixir,
      GAME_WIDTH,
      UNITS,
      (unitKey, team, x) => spawnUnit(unitKey, team, x, undefined, unitsRef)
    );
  };

  const updateGame = () => {
    updateTowerAttacks(towersRef, unitsRef, projectilesRef);
    updateUnitMovement(unitsRef, towersRef);
    updateUnitAttacks(unitsRef, towersRef, projectilesRef, hitEffectsRef);
    updateProjectiles(projectilesRef, unitsRef, towersRef, hitEffectsRef);
    updateGameState(unitsRef, towersRef, hitEffectsRef);

    // Check if king tower is destroyed (instant win)
    const kingDestroyedResult = checkKingTowerDestroyed(towersRef);
    if (kingDestroyedResult) {
      endGame(kingDestroyedResult);
      return;
    }

    // Check normal end game
    const gameEnd = checkGameEnd(towersRef);
    if (gameEnd) endGame(gameEnd);

    setRenderTrigger((prev) => prev + 1);
  };

  const endGame = async (result) => {
    // If DRAW, determine winner by stars
    let finalResult = result;
    if (result === 'DRAW') {
      finalResult = determineWinnerByStars(towersRef);
    }
    
    setGameState('GAMEOVER');
    setGameResult(finalResult);
    await saveBattleResult(user, finalResult, difficulty);
  };

  const handleBoardClick = (e) => {
    if (gameState !== 'PLAYING' || !selectedCard) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const unitKey = DECK[selectedCard.index];
    const unitStats = UNITS[unitKey];

    if (unitStats.type !== 'spell' && y < 400) {
      setInvalidPlacement(true);
      setTimeout(() => setInvalidPlacement(false), 500);
      return;
    }

    if (elixir >= unitStats.cost) {
      setElixir((prev) => prev - unitStats.cost);
      if (unitStats.type === 'spell') castSpell(unitKey, x, y, projectilesRef, UNITS);
      else spawnUnit(unitKey, 'player', x, y, unitsRef);

      // Cycle Logic
      const newHand = [...hand];
      newHand[selectedCard.handIndex] = nextCardIndex;
      setHand(newHand);
      setNextCardIndex((prev) => (prev + 1) % DECK.length);
      setSelectedCard(null);
    }
  };

  const initGame = () => {
    unitsRef.current = [];
    projectilesRef.current = [];
    hitEffectsRef.current = [];
    towersRef.current = createInitialTowers();
    setElixir(5);
    setEnemyElixir(5);
    setTimeLeft(180);
    setGameState('PLAYING');
  };

  // Main render
  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-sans select-none">
      <div style={{ width: GAME_WIDTH, height: GAME_HEIGHT }} className="relative bg-[#3c6a94] overflow-hidden shadow-2xl border-4 border-black">
        {/* GLOBAL LIGHTING */}
        <div className="absolute inset-0 pointer-events-none z-50 bg-gradient-to-tr from-blue-900/10 via-transparent to-yellow-500/10 mix-blend-overlay"></div>

        {/* MENU & DIFFICULTY SCREENS */}
        {(gameState === 'MENU' || gameState === 'DIFFICULTY_SELECT') && (
          <MenuScreen 
            onBattleClick={() => setGameState('DIFFICULTY_SELECT')}
            onCardsClick={() => setGameState('CARDS')}
            onShopClick={() => setGameState('SHOP')}
            onClansClick={() => setGameState('CLANS')}
          />
        )}

        {/* CARDS SCREEN */}
        {gameState === 'CARDS' && (
          <CardsScreen 
            onBattleClick={() => setGameState('MENU')}
            onShopClick={() => setGameState('SHOP')}
            onClansClick={() => setGameState('CLANS')}
          />
        )}

        {/* SHOP SCREEN */}
        {gameState === 'SHOP' && (
          <ShopScreen
            onClose={() => setGameState('MENU')}
            onBattleClick={() => setGameState('MENU')}
            onCardsClick={() => setGameState('CARDS')}
            onClansClick={() => setGameState('CLANS')}
          />
        )}

        {/* CLANS SCREEN */}
        {gameState === 'CLANS' && (
          <ClansScreen 
            onBattleClick={() => setGameState('MENU')}
            onShopClick={() => setGameState('SHOP')}
            onCardsClick={() => setGameState('CARDS')}
          />
        )}

        {/* DIFFICULTY MODAL */}
        {gameState === 'DIFFICULTY_SELECT' && (
          <DifficultyModal
            onSelect={(diff) => {
              setDifficulty(diff);
              initGame();
            }}
            onCancel={() => setGameState('MENU')}
          />
        )}

        {/* BATTLE SCREEN */}
        {gameState === 'PLAYING' && (
          <BattleScreen
            timeLeft={timeLeft}
            elixir={elixir}
            selectedCard={selectedCard}
            hand={hand}
            DECK={DECK}
            UNITS={UNITS}
            nextCardIndex={nextCardIndex}
            onBoardClick={handleBoardClick}
            onCardSelect={(deckIndex, handIndex) => setSelectedCard({ index: deckIndex, handIndex })}
            unitsRef={unitsRef}
            projectilesRef={projectilesRef}
            towersRef={towersRef}
            hitEffectsRef={hitEffectsRef}
            renderTrigger={renderTrigger}
            user={user}
            invalidPlacement={invalidPlacement}
          />
        )}

        {/* GAMEOVER SCREEN */}
        {gameState === 'GAMEOVER' && (
          <GameOverScreen result={gameResult} onReturn={() => setGameState('MENU')} towersRef={towersRef} />
        )}
      </div>
    </div>
  );
}
