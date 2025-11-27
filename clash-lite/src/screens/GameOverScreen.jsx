import React from 'react';
import { Star, Skull } from 'lucide-react';
import { calculateStars, getStarDisplay } from '../gameLogic/scoringSystem';

export const GameOverScreen = ({ result, onReturn, towersRef }) => {
  const { playerStars, enemyStars } = towersRef ? calculateStars(towersRef) : { playerStars: 0, enemyStars: 0 };
  
  // Determine win reason
  const getWinReason = () => {
    if (!towersRef) return '';
    
    // Check if king tower was destroyed
    if (!towersRef.current.enemy.king.active && result === 'VICTORY') {
      return '👑 King Tower Destroyed!';
    }
    if (!towersRef.current.player.king.active && result === 'DEFEAT') {
      return '👑 King Tower Destroyed!';
    }
    
    // Check if won by stars
    if (playerStars > enemyStars && result === 'VICTORY') {
      return `⭐ More Stars: ${playerStars} vs ${enemyStars}`;
    }
    if (enemyStars > playerStars && result === 'DEFEAT') {
      return `⭐ Opponent had more stars: ${enemyStars} vs ${playerStars}`;
    }
    
    return '';
  };

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-lg flex items-center justify-center z-50 animate-fadeIn">
      <div className="relative">
        {/* Glow effect */}
        <div className={`absolute -inset-1 rounded-3xl blur-3xl opacity-50 animate-pulse ${
          result === 'VICTORY' ? 'bg-green-500' : 'bg-red-500'
        }`}></div>
        
        {/* Main card */}
        <div className={`relative bg-gradient-to-b ${
          result === 'VICTORY' 
            ? 'from-green-900/20 via-slate-900 to-slate-950' 
            : 'from-red-900/20 via-slate-900 to-slate-950'
        } p-12 rounded-3xl text-center border-4 ${
          result === 'VICTORY' ? 'border-green-500/60' : 'border-red-500/60'
        } shadow-2xl`}>
          
          <h2
            className={`text-7xl font-black mb-3 drop-shadow-xl animate-bounce-subtle ${
              result === 'VICTORY'
                ? 'text-transparent bg-clip-text bg-gradient-to-b from-green-300 to-green-600'
                : result === 'DEFEAT'
                ? 'text-transparent bg-clip-text bg-gradient-to-b from-red-300 to-red-600'
                : 'text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600'
            }`}
          >
            {result === 'DRAW' ? '🤝 DRAW!' : `${result}!`}
          </h2>
          
          <p className="text-gray-300 text-base font-bold mb-8 drop-shadow-lg">{getWinReason()}</p>
          
          <div className="flex justify-center gap-12 mb-10">
            <div className="text-center bg-gradient-to-br from-blue-900/30 to-blue-950/30 p-4 rounded-2xl border border-blue-500/40 backdrop-blur-sm">
              <p className="text-gray-400 text-xs font-bold mb-3 uppercase tracking-widest">Your Stars</p>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-5xl font-black text-yellow-400 drop-shadow-lg">{getStarDisplay(playerStars)}</span>
              </div>
            </div>
            <div className="text-center bg-gradient-to-br from-red-900/30 to-red-950/30 p-4 rounded-2xl border border-red-500/40 backdrop-blur-sm">
              <p className="text-gray-400 text-xs font-bold mb-3 uppercase tracking-widest">Opponent Stars</p>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-5xl font-black text-yellow-400 drop-shadow-lg">{getStarDisplay(enemyStars)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mb-10">
            {result === 'VICTORY' ? (
              <>
                <Star className="text-yellow-400 fill-yellow-400 drop-shadow-lg animate-bounce" style={{ animationDelay: '0s' }} size={48} />
                <Star className="text-yellow-400 fill-yellow-400 drop-shadow-lg -mt-8 animate-bounce" style={{ animationDelay: '0.15s' }} size={64} />
                <Star className="text-yellow-400 fill-yellow-400 drop-shadow-lg animate-bounce" style={{ animationDelay: '0.3s' }} size={48} />
              </>
            ) : (
              <Skull className="text-gray-400 fill-gray-500 drop-shadow-lg animate-pulse" size={96} />
            )}
          </div>
          
          <button
            onClick={onReturn}
            className={`relative px-10 py-4 rounded-2xl font-black text-lg border-4 transition-all transform active:scale-95 shadow-2xl overflow-hidden group ${
              result === 'VICTORY'
                ? 'bg-gradient-to-r from-green-500 to-green-600 border-green-400 text-white hover:shadow-green-500/50'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 border-blue-400 text-white hover:shadow-blue-500/50'
            } uppercase tracking-wider drop-shadow-lg`}
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative">← RETURN TO CAMP</span>
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bounce-subtle { 
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
      `}</style>
    </div>
  );
};
