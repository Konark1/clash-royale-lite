import React from 'react';
import { Crown, Droplets } from 'lucide-react';

// Knight unit visual component
export const UnitModel = ({ type, team, isCardView = false }) => {
  const isPlayer = team === 'player';
  const scale = isCardView ? 'scale-150' : 'scale-50';
  const auraGradient = isPlayer ? 'from-blue-400/30 via-blue-500/10 to-transparent' : 'from-rose-400/30 via-rose-500/10 to-transparent';
  const baseColor = isPlayer ? 'bg-blue-500/80' : 'bg-rose-500/80';
  let model = null;

  // KNIGHT - Blue/Purple armor with sword
  if (type === 'KNIGHT') {
    model = (
      <div className="relative flex flex-col items-center filter drop-shadow-lg">
        {/* Head */}
        <div className="w-5 h-5 bg-[#ffccaa] rounded-lg border-2 border-[#d4a574] relative shadow-md">
          <div className="absolute top-1 left-1.5 w-1.5 h-1.5 bg-black rounded-full"></div>
          <div className="absolute top-1 right-1.5 w-1.5 h-1.5 bg-black rounded-full"></div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-black/40 rounded-full"></div>
        </div>
        
        {/* Helmet */}
        <div className="absolute -top-1 w-6 h-3 bg-gradient-to-b from-purple-600 to-purple-700 rounded-t-2xl border-2 border-purple-900 z-20 shadow-md">
          <div className="absolute left-1 top-1 w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
          <div className="absolute right-1 top-1 w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
        </div>

        {/* Body Armor */}
        <div className="relative -mt-2 z-10">
          <div className="w-6 h-7 bg-gradient-to-b from-blue-600 to-blue-700 rounded-lg border-2 border-blue-900 flex justify-center shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><line x1=%220%22 y1=%220%22 x2=%22100%22 y2=%22100%22 stroke=%22white%22 stroke-width=%222%22 opacity=%220.1%22/></svg>')] opacity-30"></div>
            <div className="w-full h-1 bg-yellow-600 mt-1"></div>
          </div>
          
          {/* Left Arm */}
          <div className="absolute -left-2 top-2 w-2.5 h-6 bg-[#ffccaa] rounded-full border border-[#d4a574] shadow-md transform -rotate-20"></div>
          
          {/* Right Arm - holding sword */}
          <div className="absolute -right-3 top-1 w-2.5 h-5 bg-[#ffccaa] rounded-full border border-[#d4a574] shadow-md transform rotate-12"></div>
        </div>

        {/* Shield on left */}
        <div className="absolute -left-7 top-3 w-5 h-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg border-2 border-blue-900 transform -rotate-12 shadow-lg flex items-center justify-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        </div>

        {/* Sword on right */}
        <div className="absolute -right-5 top-2 w-1.5 h-10 bg-gradient-to-b from-gray-300 to-gray-500 rounded-t-full border border-gray-700 transform rotate-12 shadow-lg">
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-yellow-600 border-2 border-yellow-800 rounded-sm"></div>
        </div>

        {/* Legs */}
        <div className="absolute -bottom-2 left-0 w-1.5 h-3 bg-[#ffccaa] rounded-b-sm shadow-sm"></div>
        <div className="absolute -bottom-2 right-0 w-1.5 h-3 bg-[#ffccaa] rounded-b-sm shadow-sm"></div>
      </div>
    );
  }

  // ARCHER - Green/Turquoise with bow
  if (type === 'ARCHER') {
    model = (
      <div className="relative flex flex-col items-center filter drop-shadow-md">
        {/* Pink/Magenta Hair */}
        <div className="w-4 h-4 bg-gradient-to-b from-pink-600 to-pink-700 rounded-t-lg border border-pink-800 z-20 relative shadow-md">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-5 h-2 bg-pink-500 rounded-t-full border border-pink-700"></div>
        </div>

        {/* Face */}
        <div className="w-3.5 h-3.5 bg-[#ffccaa] rounded-md border border-[#d4a574] relative z-10 flex items-center justify-center">
          <div className="absolute top-1 left-1 w-1 h-1 bg-black rounded-full"></div>
          <div className="absolute top-1 right-1 w-1 h-1 bg-black rounded-full"></div>
        </div>

        {/* Body - Blue Cape/Dress */}
        <div className="relative -mt-1 z-10">
          <div className="w-5 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-md border-2 border-blue-700 shadow-lg overflow-hidden">
            <div className="w-full h-1.5 bg-yellow-600 border-b border-yellow-800"></div>
          </div>

          {/* Left Arm */}
          <div className="absolute -left-2 top-1.5 w-2 h-5 bg-[#ffccaa] rounded-full border border-[#d4a574] transform -rotate-25 shadow-sm"></div>

          {/* Right Arm with Bow */}
          <div className="absolute -right-1 top-1 w-2 h-6 bg-[#ffccaa] rounded-full border border-[#d4a574] transform rotate-15 shadow-sm"></div>
        </div>

        {/* Bow on right side */}
        <div className="absolute -right-6 top-2 w-3 h-8 border-2 border-yellow-900 rounded-full bg-gradient-to-r from-yellow-700 to-yellow-800 shadow-lg">
          <div className="absolute top-1 bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-full bg-yellow-400 rounded-full"></div>
        </div>

        {/* Legs */}
        <div className="absolute -bottom-1.5 left-1 w-1.5 h-2.5 bg-[#c98a7a] rounded-b-sm shadow-sm"></div>
        <div className="absolute -bottom-1.5 right-1 w-1.5 h-2.5 bg-[#c98a7a] rounded-b-sm shadow-sm"></div>
      </div>
    );
  }

  // GOBLIN - Green/Lime with wild appearance
  if (type === 'GOBLIN') {
    model = (
      <div className="relative flex flex-col items-center filter drop-shadow-md">
        {/* Spiky Hair */}
        <div className="w-5 h-3 bg-gradient-to-b from-lime-600 to-lime-700 rounded-t-lg border-2 border-lime-800 relative z-20 shadow-md">
          <div className="absolute -top-1 left-0 w-1.5 h-2 bg-lime-500 rounded-t-full transform -rotate-20"></div>
          <div className="absolute -top-1.5 left-2 w-1.5 h-2.5 bg-lime-500 rounded-t-full"></div>
          <div className="absolute -top-1 right-2 w-1.5 h-2 bg-lime-500 rounded-t-full transform rotate-20"></div>
          <div className="absolute -top-0.5 right-0 w-1.5 h-1.5 bg-lime-500 rounded-full transform rotate-30"></div>
        </div>

        {/* Face - Green with wide smile */}
        <div className="w-4 h-4 bg-lime-500 rounded-md border-2 border-lime-700 relative z-10 flex items-center justify-center shadow-md">
          <div className="absolute top-1 left-1 w-0.75 h-0.75 bg-black rounded-full"></div>
          <div className="absolute top-1 right-1 w-0.75 h-0.75 bg-black rounded-full"></div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-0.75 bg-black/50 rounded-full"></div>
        </div>

        {/* Body */}
        <div className="relative -mt-1 z-10">
          <div className="w-5 h-6 bg-gradient-to-b from-lime-600 to-lime-700 rounded-md border-2 border-lime-800 shadow-lg overflow-hidden">
            <div className="w-full h-1 bg-yellow-600 border-b border-yellow-800"></div>
          </div>

          {/* Arms - pointed/clawed */}
          <div className="absolute -left-2.5 top-2 w-2 h-4 bg-lime-500 rounded-l-full border border-lime-700 transform -rotate-30 shadow-sm">
            <div className="absolute bottom-0 w-full h-0.5 bg-lime-400 rounded-full"></div>
          </div>
          <div className="absolute -right-2.5 top-2 w-2 h-4 bg-lime-500 rounded-r-full border border-lime-700 transform rotate-30 shadow-sm">
            <div className="absolute bottom-0 w-full h-0.5 bg-lime-400 rounded-full"></div>
          </div>
        </div>

        {/* Legs */}
        <div className="absolute -bottom-2 left-1 w-1.5 h-3 bg-lime-700 rounded-b-sm shadow-sm"></div>
        <div className="absolute -bottom-2 right-1 w-1.5 h-3 bg-lime-700 rounded-b-sm shadow-sm"></div>
      </div>
    );
  }

  // GIANT - Large muscular with armor plates
  if (type === 'GIANT') {
    model = (
      <div className="relative flex flex-col items-center filter drop-shadow-xl">
        {/* Head */}
        <div className="w-6 h-6 bg-[#ffccaa] rounded-lg border-2 border-[#d4a574] z-20 relative shadow-md overflow-hidden">
          <div className="absolute top-2 left-1.5 w-1.5 h-1.5 bg-black rounded-full"></div>
          <div className="absolute top-2 right-1.5 w-1.5 h-1.5 bg-black rounded-full"></div>
          <div className="absolute bottom-1 w-full h-1 bg-yellow-800"></div>
        </div>

        {/* Crown */}
        <div className="absolute -top-1 w-7 h-2 bg-gradient-to-b from-yellow-500 to-yellow-600 rounded-t-2xl border-2 border-yellow-700 z-20 shadow-md">
          <div className="absolute top-0 left-1 w-1 h-1.5 bg-yellow-700 rounded-t-full"></div>
          <div className="absolute top-0 left-3 w-1 h-1.5 bg-yellow-700 rounded-t-full"></div>
          <div className="absolute top-0 right-3 w-1 h-1.5 bg-yellow-700 rounded-t-full"></div>
          <div className="absolute top-0 right-1 w-1 h-1.5 bg-yellow-700 rounded-t-full"></div>
        </div>

        {/* Body Armor - Segmented plates */}
        <div className="relative -mt-1 z-10">
          <div className="w-7 h-9 bg-gradient-to-b from-blue-700 to-blue-800 rounded-lg border-2 border-blue-900 shadow-lg overflow-hidden">
            <div className="w-full h-2 bg-red-700 border-b-2 border-red-900"></div>
            <div className="w-full h-0.5 bg-red-600 opacity-60"></div>
            <div className="w-full h-0.5 bg-red-600 opacity-60 mt-1"></div>
          </div>

          {/* Left Arm */}
          <div className="absolute -left-3 top-2 w-3 h-8 bg-[#ffccaa] rounded-full border-2 border-[#d4a574] shadow-md transform -rotate-25">
            <div className="absolute -bottom-1.5 left-0 w-4 h-2 bg-gray-400 border border-gray-600 rounded-sm shadow-sm"></div>
          </div>

          {/* Right Arm */}
          <div className="absolute -right-3 top-2 w-3 h-8 bg-[#ffccaa] rounded-full border-2 border-[#d4a574] shadow-md transform rotate-25">
            <div className="absolute -bottom-1.5 right-0 w-4 h-2 bg-gray-400 border border-gray-600 rounded-sm shadow-sm"></div>
          </div>
        </div>

        {/* Legs - Large */}
        <div className="absolute -bottom-3 left-0.5 w-2.5 h-4 bg-[#ffccaa] rounded-b-lg border-2 border-[#d4a574] shadow-md"></div>
        <div className="absolute -bottom-3 right-0.5 w-2.5 h-4 bg-[#ffccaa] rounded-b-lg border-2 border-[#d4a574] shadow-md"></div>
      </div>
    );
  }

  // MUSKETEER - Female with ranged weapon
  if (type === 'MUSKETEER') {
    model = (
      <div className="relative flex flex-col items-center filter drop-shadow-md">
        {/* Blonde Hair */}
        <div className="w-4 h-3.5 bg-gradient-to-b from-yellow-500 to-yellow-600 rounded-t-lg border-2 border-yellow-700 z-20 relative shadow-md">
          <div className="absolute -top-0.5 left-0.5 w-1.5 h-1.5 bg-yellow-400 rounded-t-full border border-yellow-600"></div>
          <div className="absolute -top-0.5 right-0.5 w-1.5 h-1.5 bg-yellow-400 rounded-t-full border border-yellow-600"></div>
        </div>

        {/* Face */}
        <div className="w-3.5 h-3.5 bg-[#ffccaa] rounded-lg border border-[#d4a574] relative z-10 flex items-center justify-center shadow-md">
          <div className="absolute top-0.75 left-0.75 w-0.75 h-0.75 bg-black rounded-full"></div>
          <div className="absolute top-0.75 right-0.75 w-0.75 h-0.75 bg-black rounded-full"></div>
        </div>

        {/* Body - Purple dress with cape */}
        <div className="relative -mt-1 z-10">
          <div className="w-5 h-6 bg-gradient-to-b from-purple-600 to-purple-700 rounded-md border-2 border-purple-800 shadow-lg overflow-hidden">
            <div className="w-full h-1 bg-yellow-600 border-b border-yellow-800"></div>
          </div>

          {/* Cape */}
          <div className="absolute -left-4 top-1 w-3.5 h-5 bg-blue-500 border-2 border-blue-700 rounded-l-lg transform -skew-y-12 shadow-md opacity-80"></div>

          {/* Left Arm */}
          <div className="absolute -left-2 top-2 w-2 h-5 bg-[#ffccaa] rounded-full border border-[#d4a574] transform -rotate-30 shadow-sm"></div>

          {/* Right Arm - holding rifle */}
          <div className="absolute -right-1 top-1 w-2 h-6 bg-[#ffccaa] rounded-full border border-[#d4a574] transform rotate-20 shadow-sm"></div>
        </div>

        {/* Rifle */}
        <div className="absolute -right-7 top-1.5 w-1 h-8 bg-gradient-to-b from-gray-600 to-gray-800 rounded-t-full border border-gray-900 transform rotate-25 shadow-lg">
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-1 bg-gray-700 border border-gray-900 rounded-sm"></div>
        </div>

        {/* Legs */}
        <div className="absolute -bottom-2 left-1 w-1.5 h-3 bg-[#c98a7a] rounded-b-sm shadow-sm"></div>
        <div className="absolute -bottom-2 right-1 w-1.5 h-3 bg-[#c98a7a] rounded-b-sm shadow-sm"></div>
      </div>
    );
  }

  // PEKKA - Robotic/Armored with spikes
  if (type === 'PEKKA') {
    model = (
      <div className="relative flex flex-col items-center filter drop-shadow-lg">
        {/* Helmet with spikes */}
        <div className="w-5.5 h-4.5 bg-gradient-to-b from-purple-700 to-purple-800 rounded-lg border-2 border-purple-900 z-20 relative shadow-md overflow-hidden">
          <div className="absolute -top-1.5 left-0.5 w-1.5 h-2.5 bg-purple-600 rounded-t-full transform -rotate-15 shadow-md"></div>
          <div className="absolute -top-2 left-2.5 w-2 h-3 bg-purple-600 rounded-t-full shadow-md"></div>
          <div className="absolute -top-1.5 right-2.5 w-2 h-3 bg-purple-600 rounded-t-full shadow-md"></div>
          <div className="absolute -top-1.5 right-0.5 w-1.5 h-2.5 bg-purple-600 rounded-t-full transform rotate-15 shadow-md"></div>
        </div>

        {/* Face - Eyes */}
        <div className="absolute top-2 z-30">
          <div className="w-7 h-3 bg-purple-800 rounded-lg flex items-center justify-center gap-2 px-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full border border-purple-900 shadow-sm"></div>
            <div className="w-1.5 h-1.5 bg-white rounded-full border border-purple-900 shadow-sm"></div>
          </div>
        </div>

        {/* Body Armor */}
        <div className="relative -mt-1 z-10">
          <div className="w-6.5 h-9 bg-gradient-to-b from-purple-700 via-purple-800 to-purple-900 rounded-lg border-2 border-purple-950 shadow-lg overflow-hidden">
            <div className="w-full h-1 bg-purple-400 opacity-50"></div>
            <div className="w-full h-8 bg-gradient-to-b from-purple-700 to-purple-900"></div>
          </div>

          {/* Left Arm/Spike */}
          <div className="absolute -left-4 top-2 w-2 h-9 bg-gradient-to-b from-gray-500 to-gray-700 rounded-l-full border-2 border-gray-800 shadow-lg transform -rotate-30">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-gray-400 shadow-sm"></div>
          </div>

          {/* Right Arm/Spike */}
          <div className="absolute -right-4 top-2 w-2 h-9 bg-gradient-to-b from-gray-500 to-gray-700 rounded-r-full border-2 border-gray-800 shadow-lg transform rotate-30">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-gray-400 shadow-sm"></div>
          </div>
        </div>

        {/* Legs */}
        <div className="absolute -bottom-3 left-0.5 w-2.5 h-4.5 bg-gradient-to-b from-gray-600 to-gray-800 rounded-b-lg border-2 border-gray-900 shadow-md"></div>
        <div className="absolute -bottom-3 right-0.5 w-2.5 h-4.5 bg-gradient-to-b from-gray-600 to-gray-800 rounded-b-lg border-2 border-gray-900 shadow-md"></div>
      </div>
    );
  }

  // MINION - Flying demon/creature
  if (type === 'MINIONS') {
    model = (
      <div className="relative flex flex-col items-center filter drop-shadow-md">
        {/* Head with horns */}
        <div className="w-4 h-4 bg-gradient-to-b from-purple-500 to-purple-600 rounded-lg border-2 border-purple-700 z-20 relative shadow-md overflow-hidden">
          {/* Left horn */}
          <div className="absolute -top-2 left-0.5 w-1 h-2.5 bg-gradient-to-t from-purple-600 to-purple-400 border border-purple-700 rounded-t-full transform -rotate-20 shadow-sm"></div>
          {/* Right horn */}
          <div className="absolute -top-2 right-0.5 w-1 h-2.5 bg-gradient-to-t from-purple-600 to-purple-400 border border-purple-700 rounded-t-full transform rotate-20 shadow-sm"></div>
          {/* Eyes */}
          <div className="absolute top-1 left-1 w-0.75 h-0.75 bg-white rounded-full border border-purple-900 shadow-sm"></div>
          <div className="absolute top-1 right-1 w-0.75 h-0.75 bg-white rounded-full border border-purple-900 shadow-sm"></div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-0.75 bg-white/80 rounded-full"></div>
        </div>

        {/* Body */}
        <div className="relative -mt-1 z-10 w-4 h-5 bg-gradient-to-b from-purple-500 to-purple-700 rounded-md border-2 border-purple-800 shadow-lg overflow-hidden">
          <div className="w-full h-1 bg-white/30"></div>
        </div>

        {/* Left Wing */}
        <div className="absolute -left-3.5 top-3 w-3 h-6 bg-gradient-to-l from-purple-600 to-purple-700 rounded-full border border-purple-800 transform -rotate-40 shadow-md">
          <div className="absolute top-0 left-0 w-1.5 h-6 bg-purple-400/50 rounded-full"></div>
        </div>

        {/* Right Wing */}
        <div className="absolute -right-3.5 top-3 w-3 h-6 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full border border-purple-800 transform rotate-40 shadow-md">
          <div className="absolute top-0 right-0 w-1.5 h-6 bg-purple-400/50 rounded-full"></div>
        </div>

        {/* Tail/Spike */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-gradient-to-b from-purple-600 to-purple-800 border border-purple-900 rounded-b-full shadow-sm"></div>
      </div>
    );
  }

  if (!model) {
    model = <div className="w-4 h-4 bg-gray-500 rounded-full" />;
  }

  return (
    <div className={`relative flex flex-col items-center ${scale}`}>
      <div className={`absolute inset-0 blur-2xl opacity-60 pointer-events-none bg-gradient-to-b ${auraGradient}`}></div>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-black/50 rounded-full blur-md"></div>
      <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-3 ${baseColor} rounded-full border-2 border-white/40 shadow-inner`}></div>
      <div className={`relative z-10 ${isCardView ? 'animate-[wiggle_2.5s_ease-in-out_infinite]' : ''}`}>{model}</div>
      <style>
        {`@keyframes wiggle {
            0%,100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-2px) rotate(1deg); }
        }`}
      </style>
    </div>
  );
};

// Tower base visual component
export const BaseModel = ({ team, type, hp, maxHp }) => {
  const isPlayer = team === 'player';
  const isKing = type === 'KING';
  const baseColor = isPlayer ? 'bg-blue-600' : 'bg-red-600';
  const highlight = isPlayer ? 'bg-blue-400' : 'bg-red-400';
  const sizeScale = isKing ? 'scale-60' : 'scale-50';

  return (
    <div className={`relative flex flex-col items-center pointer-events-none ${sizeScale} filter drop-shadow-2xl`}>
      {/* HP Bar */}
      <div className="absolute -top-24 z-50 w-36 h-5 bg-gray-900 rounded-full border-2 border-white overflow-hidden shadow-2xl">
        <div
          className={`h-full ${
            team === 'player' ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-700'
          } transition-all duration-300 relative`}
          style={{ width: `${Math.max(0, (hp / maxHp) * 100)}%` }}
        >
          <div className="absolute top-0 w-full h-2 bg-white/30 rounded-full"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] tracking-wider">
          {Math.ceil(hp)}
        </div>
      </div>

      {/* Character on Top */}
      <div className="absolute -top-8 z-20">
        {isKing ? (
          <div className="flex flex-col items-center animate-bounce" style={{ animationDuration: '4s' }}>
            <div className="w-12 h-10 bg-gradient-to-b from-yellow-300 to-yellow-600 rounded-t-2xl border-2 border-yellow-800 flex items-center justify-center relative shadow-lg">
              <Crown size={20} className="text-yellow-900" strokeWidth={3} />
            </div>
            <div className="w-10 h-6 bg-gray-700 rounded-b-xl border-2 border-gray-900 -mt-1 relative flex justify-center">
              <div className="w-6 h-6 bg-black rounded-full border-4 border-gray-600 -mt-1 shadow-inner"></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-[#ffccaa] rounded-full border-2 border-[#d4a768] flex items-center justify-center relative z-10 shadow-sm">
              <div className="absolute -top-1 w-9 h-4 bg-black rounded-t-full"></div>
              <div className="w-5 h-1.5 bg-pink-500 rounded-full mt-2"></div>
            </div>
          </div>
        )}
      </div>

      <div className={`w-20 h-8 ${baseColor} border-2 border-black/50 relative z-10 flex justify-between px-1 shadow-lg rounded-sm`}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-3 h-5 bg-black/20 -mt-2 border border-white/10 rounded-sm"></div>
        ))}
      </div>

      <div className="w-24 h-20 bg-gray-300 border-2 border-gray-600 relative flex flex-col items-center shadow-xl overflow-hidden rounded-sm">
        <div className="absolute w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stone-wall.png')]"></div>
        <div className={`w-12 h-full ${highlight} border-x-2 border-black/20 flex flex-col items-center pt-2 shadow-inner`}>
          {isKing ? (
            <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-yellow-700 flex items-center justify-center shadow-md">
              <Crown size={14} className="text-yellow-900" />
            </div>
          ) : (
            <div className="w-6 h-10 bg-white/20 skew-y-12 blur-sm"></div>
          )}
        </div>
        <div className="absolute bottom-0 w-full h-4 bg-green-800/40 blur-sm"></div>
      </div>
    </div>
  );
};

// Projectile visual component
export const ProjectileModel = ({ type, rotation }) => {
  if (type === 'ARROW') {
    return (
      <div style={{ transform: `rotate(${rotation}rad)` }} className="relative w-10 h-2 drop-shadow-md">
        <div className="absolute left-0 w-8 h-0.5 bg-[#5c3a21]"></div>
        <div className="absolute left-0 w-3 h-2 bg-gray-300 rounded-l-full border border-gray-500"></div>
        <div className="absolute right-0 w-3 h-3 bg-white skew-x-12 border border-gray-400"></div>
      </div>
    );
  }
  if (type === 'CANNONBALL') {
    return <div className="w-4 h-4 bg-gradient-to-br from-gray-700 to-black rounded-full shadow-lg"></div>;
  }
  if (type === 'FIREBALL') {
    return (
      <div className="w-14 h-14 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 rounded-full shadow-[0_0_30px_orange] animate-spin border-2 border-white/20 relative overflow-hidden mix-blend-hard-light">
        <div className="absolute top-3 left-3 w-4 h-4 bg-white rounded-full blur-md"></div>
      </div>
    );
  }
  return null;
};
