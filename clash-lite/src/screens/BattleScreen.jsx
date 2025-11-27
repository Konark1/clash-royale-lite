import React from 'react';
import { Clock, Droplets } from 'lucide-react';
import { GAME_WIDTH, GAME_HEIGHT, TOWER_Y_PLAYER_KING, TOWER_Y_ENEMY_KING, TOWER_Y_PLAYER_PRIN, TOWER_Y_ENEMY_PRIN, LANE_LEFT_X, LANE_RIGHT_X, BRIDGE_Y, UNITS, DECK } from '../config/constants';
import { UnitModel, BaseModel, ProjectileModel } from '../components/UnitModels';
import { calculateStars, getStarDisplay } from '../gameLogic/scoringSystem';
import knightImg from '../assets/cards/Knight.png';
import archerImg from '../assets/cards/archer.jpg';
import goblinImg from '../assets/cards/Goblin.png';
import giantImg from '../assets/cards/Giant.png';
import musketeerImg from '../assets/cards/Musketeer.png';
import pekkaImg from '../assets/cards/PEKKA.png';
import minionsImg from '../assets/cards/Minion.jpg';
import fireballImg from '../assets/cards/Fireball.jpg';

const CARD_IMAGES = {
  KNIGHT: knightImg,
  ARCHER: archerImg,
  GOBLIN: goblinImg,
  GIANT: giantImg,
  MUSKETEER: musketeerImg,
  PEKKA: pekkaImg,
  MINIONS: minionsImg,
  FIREBALL: fireballImg,
};

export const BattleScreen = ({
  timeLeft,
  elixir,
  selectedCard,
  hand,
  DECK,
  UNITS,
  nextCardIndex,
  onBoardClick,
  onCardSelect,
  unitsRef,
  projectilesRef,
  towersRef,
  hitEffectsRef,
  renderTrigger,
  user,
  invalidPlacement,
}) => {
  const cardPreviewKey = DECK[nextCardIndex ?? 0];
  const cardPreviewImage = CARD_IMAGES[cardPreviewKey];

  const renderCardVisual = (unitKey, sizeClass = 'scale-50') => {
    const cardImage = CARD_IMAGES[unitKey];
    if (cardImage) {
      return (
        <>
          <img
            src={cardImage}
            alt={unitKey}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-200 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
        </>
      );
    }
    return (
      <div className={`${sizeClass} z-10`}>
        <UnitModel type={unitKey} team="player" isCardView={true} />
      </div>
    );
  };

  return (
    <div
      className={`relative bg-[#5da02a] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden transition-colors duration-200 w-full h-full ${
        invalidPlacement ? 'ring-4 ring-inset ring-red-500' : ''
      }`}
    >
      {/* BATTLE TOP BAR */}
      <div className="absolute top-0 w-full h-12 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 flex justify-between items-center px-4 z-40 backdrop-blur-md border-b-3 border-blue-500/40 shadow-2xl">
        <div className="flex flex-col gap-0.5">
          <span className="text-white font-bold text-[10px] uppercase tracking-widest drop-shadow-lg opacity-80">OPPONENT</span>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-xs drop-shadow-lg">Trainer Earl</span>
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg">
              <span className="text-sm">⭐</span>
              <span className="text-xs font-bold text-slate-900">{getStarDisplay(calculateStars(towersRef).enemyStars)}</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-slate-700 to-slate-900 px-4 py-1 rounded-xl text-white font-mono font-bold border-2 border-yellow-400/50 flex items-center gap-2 shadow-2xl backdrop-blur-sm">
          <Clock size={16} className="text-yellow-400 animate-pulse" />
          <span className={`text-xs font-black ${timeLeft < 30 ? 'text-red-400 animate-pulse' : 'text-yellow-300'}`}>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-white font-bold text-[10px] uppercase tracking-widest drop-shadow-lg opacity-80">YOU</span>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-xs drop-shadow-lg">{user ? 'Guest' : 'Player'}</span>
            <div className="bg-gradient-to-r from-green-400 to-green-500 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg">
              <span className="text-sm">⭐</span>
              <span className="text-xs font-bold text-slate-900">{getStarDisplay(calculateStars(towersRef).playerStars)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- TERRAIN LAYERS --- */}
      <div className="absolute top-0 bottom-0 left-0 w-[30px] bg-[#3a2512] z-10 flex flex-col justify-between items-center py-4 shadow-xl border-r-4 border-[#2a1a0c]">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-6 h-6 bg-green-900 rounded-full border-2 border-green-950 opacity-80 mb-8"></div>
        ))}
      </div>
      <div className="absolute top-0 bottom-0 right-0 w-[30px] bg-[#3a2512] z-10 flex flex-col justify-between items-center py-4 shadow-xl border-l-4 border-[#2a1a0c]">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-5 h-5 bg-gray-600 rounded-full border-2 border-gray-800 opacity-80 mb-12"></div>
        ))}
      </div>

      <div
        className="absolute inset-0 z-0"
        style={{
          left: '30px',
          right: '30px',
          backgroundImage: `linear-gradient(45deg, #6cbd45 25%, transparent 25%, transparent 75%, #6cbd45 75%, #6cbd45), linear-gradient(45deg, #6cbd45 25%, transparent 25%, transparent 75%, #6cbd45 75%, #6cbd45)`,
          backgroundColor: '#63b33d',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      ></div>

      <svg className="absolute inset-0 pointer-events-none z-0 opacity-80" width={GAME_WIDTH} height={GAME_HEIGHT}>
        <path
          d={`M${GAME_WIDTH / 2} ${TOWER_Y_PLAYER_KING} L${LANE_LEFT_X} ${TOWER_Y_PLAYER_PRIN} L${LANE_LEFT_X} ${BRIDGE_Y} L${LANE_LEFT_X} ${TOWER_Y_ENEMY_PRIN} L${GAME_WIDTH / 2} ${TOWER_Y_ENEMY_KING}`}
          stroke="#d6ad7a"
          strokeWidth="30"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={`M${GAME_WIDTH / 2} ${TOWER_Y_PLAYER_KING} L${LANE_RIGHT_X} ${TOWER_Y_PLAYER_PRIN} L${LANE_RIGHT_X} ${BRIDGE_Y} L${LANE_RIGHT_X} ${TOWER_Y_ENEMY_PRIN} L${GAME_WIDTH / 2} ${TOWER_Y_ENEMY_KING}`}
          stroke="#d6ad7a"
          strokeWidth="30"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={`M${LANE_LEFT_X} ${TOWER_Y_PLAYER_PRIN} L${LANE_RIGHT_X} ${TOWER_Y_PLAYER_PRIN}`}
          stroke="#d6ad7a"
          strokeWidth="20"
          fill="none"
        />
        <path
          d={`M${LANE_LEFT_X} ${TOWER_Y_ENEMY_PRIN} L${LANE_RIGHT_X} ${TOWER_Y_ENEMY_PRIN}`}
          stroke="#d6ad7a"
          strokeWidth="20"
          fill="none"
        />
      </svg>

      {/* River/Bridge */}
      <div className="absolute w-full h-16 bg-[#3daee9] top-[400px] -translate-y-1/2 border-y-[4px] border-[#298bbd] flex items-center justify-center overflow-hidden shadow-inner z-0">
        <div
          className="w-[200%] h-full absolute opacity-40"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.6) 20px, rgba(255,255,255,0.6) 30px)',
            animation: 'slide 5s linear infinite',
          }}
        ></div>
        <style>{`@keyframes slide { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>

      {/* Bridge Paths */}
      {[LANE_LEFT_X, LANE_RIGHT_X].map((laneX, idx) => (
        <div
          key={idx}
          className="absolute w-16 h-24 bg-[#a67c52] top-[400px] -translate-y-1/2 border-x-[4px] border-[#5e3b1f] shadow-lg flex flex-col justify-between py-1 z-0"
          style={{ left: laneX - 32 }}
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full h-3 bg-[#8b5a2b] opacity-50 my-0.5 border-b border-[#5e3b1f]"></div>
          ))}
        </div>
      ))}

      <div className="absolute inset-0 z-10" onClick={onBoardClick}></div>

      {/* Placement guide */}
      {selectedCard &&
        (UNITS[DECK[selectedCard.index]].type !== 'spell' ? (
          <div
            className="absolute w-full bg-blue-500/10 pointer-events-none border-t-4 border-blue-400/50 border-dashed animate-pulse z-0"
            style={{ top: BRIDGE_Y, height: GAME_HEIGHT - BRIDGE_Y }}
          ></div>
        ) : (
          <div className="absolute w-full bg-red-500/10 pointer-events-none border-4 border-red-500/50 border-dashed animate-pulse z-50" style={{ top: 0, height: GAME_HEIGHT }}>
            <div className="absolute top-32 left-1/2 -translate-x-1/2 text-red-100 text-sm font-bold bg-red-600/80 px-4 py-2 rounded-full shadow-lg">
              TARGET ANYWHERE
            </div>
          </div>
        ))}

      {/* Towers */}
      {['enemy', 'player'].map((team) =>
        ['king', 'left', 'right'].map((type) => {
          const t = towersRef.current[team][type];
          if (!t.active)
            return (
              <div
                key={team + type}
                className="absolute w-16 h-8 bg-gray-800 rounded-full opacity-50 border-4 border-black z-0 blur-[1px] pointer-events-none"
                style={{
                  left: t.x,
                  top: t.y,
                  transform: 'translate(-50%, -50%)',
                }}
              ></div>
            );
          return (
            <div
              key={team + type}
              className="absolute z-10 pointer-events-none"
              style={{ left: t.x, top: t.y, transform: 'translate(-50%, -50%)' }}
            >
              <BaseModel team={team} type={type.toUpperCase()} hp={t.hp} maxHp={t.maxHp} />
            </div>
          );
        })
      )}

      {/* Projectiles */}
      {projectilesRef.current.map((p) => {
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const rotation = Math.atan2(dy, dx);
        return (
          <div
            key={p.id}
            className="absolute z-30 pointer-events-none transition-transform"
            style={{ left: p.x, top: p.y, transform: 'translate(-50%, -50%)' }}
          >
            <ProjectileModel type={p.type} rotation={rotation} />
          </div>
        );
      })}

      {/* Hit Effects */}
      {hitEffectsRef.current.map((h, i) => (
        <div
          key={i}
          className="absolute pointer-events-none z-40"
          style={{ left: h.x, top: h.y, transform: 'translate(-50%, -50%)' }}
        >
          {h.type === 'EXPLOSION' && (
            <div className="w-32 h-32 bg-orange-500 rounded-full opacity-60 animate-ping blur-md mix-blend-screen"></div>
          )}
          {h.type === 'HIT' && <div className="w-8 h-8 bg-yellow-200 rounded-full animate-ping blur-sm"></div>}
          {h.type === 'SLASH' && (
            <div
              className="w-16 h-1 bg-white animate-ping shadow-[0_0_10px_white]"
              style={{ transform: `rotate(${Math.random() * 360}deg)` }}
            ></div>
          )}
        </div>
      ))}

      {/* Units */}
      {unitsRef.current.map((u) => (
        <div
          key={u.id}
          className="absolute z-20 pointer-events-none transition-all duration-75 ease-linear"
          style={{
            left: u.x,
            top: u.y,
            width: 30,
            height: 30,
            transform: `translate(-50%, -50%) ${u.state === 'ATTACKING' ? 'scale(1.1)' : 'scale(1)'}`,
          }}
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-2 bg-gray-900 border border-black rounded-full overflow-hidden shadow-sm z-30">
            <div
              className={`h-full ${u.team === 'player' ? 'bg-green-400' : 'bg-red-500'}`}
              style={{ width: `${Math.max(0, (u.currentHp / u.hp) * 100)}%` }}
            ></div>
          </div>
          <div className="absolute bottom-0 w-8 h-3 bg-black/30 rounded-full blur-[3px] left-1/2 -translate-x-1/2"></div>
          <div className="mb-2">
            <UnitModel type={u.key} team={u.team} />
          </div>
        </div>
      ))}

      {/* UI HUD */}
      <div className="absolute bottom-0 w-full z-50 pointer-events-none">
        <div className="relative h-36 max-w-[480px] mx-auto px-3">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e4a] via-[#0e2d6e]/85 to-transparent rounded-t-[36px] shadow-[0_-12px_35px_rgba(0,0,0,0.45)] border-x-[6px] border-[#1c4ca8]/30 border-t-[4px] border-[#2b67d2]/30"></div>
          <div className="relative h-full flex flex-col justify-end gap-3 pointer-events-auto pb-3 text-white">
            <div className="flex items-end gap-4 justify-center">
              {/* Deck cards */}
              <div className="flex gap-3">
                {hand.map((deckIndex, i) => {
                  const unitKey = DECK[deckIndex];
                  const card = UNITS[unitKey];
                  const canAfford = elixir >= card.cost;
                  const isSelected = selectedCard?.handIndex === i;
                  return (
                    <button
                      key={i}
                      onClick={() => canAfford && onCardSelect(deckIndex, i)}
                      className={`relative group w-20 h-32 rounded-[26px] border-[6px] flex-shrink-0 transition-transform duration-150 ${
                        isSelected ? 'border-yellow-300 shadow-[0_0_25px_rgba(255,255,120,0.85)] -translate-y-1' : 'border-[#0b1b3a]'
                      } ${canAfford ? 'hover:-translate-y-1 cursor-pointer' : 'opacity-40 grayscale cursor-not-allowed'}`}
                      style={{ background: 'linear-gradient(180deg,#2a6af8 0%,#143478 60%,#0b1634 100%)', boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.2)' }}
                    >
                      <div className="absolute inset-2 rounded-2xl overflow-hidden flex items-center justify-center bg-black/20">
                        <img
                          src={CARD_IMAGES[unitKey]}
                          alt={card.name}
                          className="w-full h-full object-cover object-center transition-transform duration-200 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
                      </div>
                      <div
                        className="absolute -bottom-3 right-3 w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white font-black text-base shadow-lg"
                        style={{ background: canAfford ? 'linear-gradient(180deg,#f08fff 0%,#f05a8c 100%)' : '#6b6b6b' }}
                      >
                        {card.cost}
                      </div>
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white drop-shadow-md">Lvl 9</div>
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Elixir bar */}
            <div className="h-8 bg-gradient-to-b from-[#09224a] to-[#041633] border-[4px] border-[#2a63d7] rounded-full relative overflow-hidden shadow-2xl mx-4">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1b4ca8] to-transparent opacity-30"></div>
              <div
                className="absolute inset-y-1 left-1 rounded-full bg-gradient-to-r from-[#b958ff] via-[#ff5fb1] to-[#ff9f5f] transition-all duration-200 shadow-[0_0_20px_rgba(255,96,181,0.5)]"
                style={{ width: `calc(${(Math.min(elixir, 10) / 10) * 100}% - 12px)` }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-between px-5 text-white font-black">
                <div className="flex items-baseline gap-2 text-[#d7e6ff]">
                  <span className="text-[12px] uppercase tracking-[0.2em]">Elixir</span>
                  <span className="text-[10px] text-[#8fb8ff]">Max: 10</span>
                </div>
                <div className="flex items-center gap-2 drop-shadow-lg">
                  <Droplets size={16} className="fill-pink-300 text-pink-300" />
                  <span className="text-xl">{Math.floor(elixir)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
