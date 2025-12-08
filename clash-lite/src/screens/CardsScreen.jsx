import React from 'react';
import { ShoppingCart, Layers, Sword, Users, Calendar, Crown, Shield, ArrowLeft } from 'lucide-react';
import { UNITS } from '../config/constants';
import { UnitModel } from '../components/UnitModels';
import knightImg from '../assets/cards/Knight.png';
import archerImg from '../assets/cards/archer.jpg';
import goblinImg from '../assets/cards/Goblin.png';
import giantImg from '../assets/cards/Giant.png';
import musketeerImg from '../assets/cards/Musketeer.png';
import pekkaImg from '../assets/cards/PEKKA.png';
import minionsImg from '../assets/cards/Minion.jpg';
import fireballImg from '../assets/cards/Fireball.jpg';

export const CardsScreen = ({ onBattleClick, onShopClick, onClansClick }) => {
  const troops = [
    { key: 'KNIGHT', rarity: 'common', description: 'Brave knight with shield', image: knightImg },
    { key: 'ARCHER', rarity: 'common', description: 'Ranged ground attacker', image: archerImg },
    { key: 'GOBLIN', rarity: 'common', description: 'Speedy melee goblin', image: goblinImg },
    { key: 'GIANT', rarity: 'rare', description: 'Tanky building target', image: giantImg },
    { key: 'MUSKETEER', rarity: 'rare', description: 'Powerful ranged unit', image: musketeerImg },
    { key: 'PEKKA', rarity: 'epic', description: 'Legendary tank unit', image: pekkaImg },
    { key: 'MINIONS', rarity: 'common', description: 'Flying attackers', image: minionsImg },
    { key: 'FIREBALL', rarity: 'common', description: 'Fire attack', image: FireballImg },

  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common':
        return 'from-gray-400 to-gray-600';
      case 'rare':
        return 'from-purple-400 to-purple-600';
      case 'epic':
        return 'from-yellow-400 to-orange-600';
      case 'legendary':
        return 'from-red-400 to-red-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityBorder = (rarity) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-500';
      case 'rare':
        return 'border-purple-500';
      case 'epic':
        return 'border-yellow-500';
      case 'legendary':
        return 'border-red-500';
      default:
        return 'border-gray-500';
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(45deg, rgba(100, 150, 255, 0.3) 1px, transparent 1px), linear-gradient(-45deg, rgba(100, 150, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      ></div>

      {/* TOP STATS BAR */}
      <div className="flex justify-between items-center px-6 py-3 bg-gradient-to-r from-slate-900/80 to-slate-800/60 border-b-4 border-blue-500/40 z-20 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl border-3 border-cyan-300 flex items-center justify-center shadow-2xl">
              <Crown className="text-white fill-white drop-shadow-lg" size={28} />
            </div>
            <span className="absolute -bottom-2 -right-2 bg-gradient-to-br from-orange-400 to-red-500 text-white font-black text-sm px-3 py-1 rounded-full border-2 border-orange-600 shadow-lg">1</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-blue-300 text-[10px] font-bold tracking-widest uppercase opacity-80">Level</span>
            <span className="text-white text-xl font-black drop-shadow-md">KSV</span>
            <span className="text-gray-400 text-xs font-semibold">No Clan</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-gradient-to-br from-blue-600/40 to-blue-800/40 px-4 py-2 rounded-xl border-2 border-blue-400/60 backdrop-blur-sm shadow-lg">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-300 to-blue-600 rounded-lg border border-blue-500 shadow-lg flex items-center justify-center">
              <span className="text-white text-xs font-black">👤</span>
            </div>
            <span className="text-blue-100 font-bold text-sm drop-shadow-md">99</span>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-br from-yellow-500/40 to-amber-600/40 px-4 py-2 rounded-xl border-2 border-yellow-400/60 backdrop-blur-sm shadow-lg">
            <Crown className="text-yellow-300 fill-yellow-300" size={20} />
            <span className="text-yellow-100 font-bold text-sm drop-shadow-md">0</span>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-br from-green-500/40 to-emerald-600/40 px-4 py-2 rounded-xl border-2 border-green-400/60 backdrop-blur-sm shadow-lg">
            <Shield className="text-green-300" size={20} />
            <span className="text-green-100 font-bold text-sm drop-shadow-md">100</span>
          </div>
        </div>
      </div>

      {/* TROOPS TITLE */}
      <div className="px-6 py-4 text-center">
        <h1 className="text-3xl font-black text-yellow-400 drop-shadow-lg tracking-wider">TROOPS & SPELLS</h1>
        <p className="text-blue-300 text-sm font-semibold mt-1">All your available cards</p>
      </div>

      {/* TROOPS GRID */}
      <div className="flex-1 px-4 overflow-y-auto pb-4">
        <div className="grid grid-cols-2 gap-4">
          {troops.map((troop) => {
            const unit = UNITS[troop.key];
            const isSpell = unit.type === 'spell';
            
            return (
              <div
                key={troop.key}
                className={`bg-gradient-to-br ${getRarityColor(troop.rarity)} rounded-xl border-4 ${getRarityBorder(troop.rarity)} shadow-2xl overflow-hidden hover:scale-105 transition-all cursor-pointer group relative`}
              >
                {/* Card Header */}
                <div className="bg-black/60 px-3 py-2 border-b-3 border-black/80 flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <h3 className="text-white font-black text-sm drop-shadow-md leading-tight">{unit.name}</h3>
                    <p className="text-[9px] text-gray-300 font-semibold mt-0.5">{troop.description}</p>
                  </div>
                  {/* Cost Badge */}
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full border-3 border-purple-300 flex items-center justify-center shadow-xl flex-shrink-0">
                    <span className="text-white font-black text-lg drop-shadow-md">{unit.cost}</span>
                  </div>
                </div>

                {/* Card Image Area - Enhanced */}
                <div className={`${isSpell ? 'bg-gradient-to-b from-orange-800/40 to-red-900/60' : 'bg-gradient-to-b from-slate-700/60 to-slate-900/80'} h-36 flex items-center justify-center relative overflow-hidden group-hover:brightness-125 transition-all`}>
                  <img
                    src={troop.image}
                    alt={unit.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-center scale-110 group-hover:scale-125 transition-transform duration-300"
                  />
                  {/* Gradient overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80"></div>
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="relative z-10 flex flex-col items-center text-white drop-shadow-lg">
                    <span className="text-[10px] uppercase font-black tracking-widest">{troop.rarity}</span>
                    <span className="text-lg font-black">{unit.name}</span>
                  </div>
                </div>

                {/* Card Stats */}
                <div className="bg-black/70 px-2.5 py-2 border-t-3 border-black/80">
                  {isSpell ? (
                    <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                      <div className="bg-black/50 rounded px-1.5 py-1 text-center border border-orange-500/30">
                        <span className="text-orange-300 font-bold block">⚡ {unit.dmg}</span>
                        <span className="text-gray-400 text-[8px]">Damage</span>
                      </div>
                      <div className="bg-black/50 rounded px-1.5 py-1 text-center border border-red-500/30">
                        <span className="text-red-300 font-bold block">💥 {unit.radius}</span>
                        <span className="text-gray-400 text-[8px]">Radius</span>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                      <div className="bg-black/50 rounded px-1.5 py-1 text-center border border-red-500/30">
                        <span className="text-red-300 font-bold block">❤ {unit.hp}</span>
                        <span className="text-gray-400 text-[8px]">HP</span>
                      </div>
                      <div className="bg-black/50 rounded px-1.5 py-1 text-center border border-yellow-500/30">
                        <span className="text-yellow-300 font-bold block">⚔ {unit.dmg}</span>
                        <span className="text-gray-400 text-[8px]">Dmg</span>
                      </div>
                      <div className="bg-black/50 rounded px-1.5 py-1 text-center border border-blue-500/30">
                        <span className="text-blue-300 font-bold block">🏃 {unit.speed}</span>
                        <span className="text-gray-400 text-[8px]">Speed</span>
                      </div>
                      <div className="bg-black/50 rounded px-1.5 py-1 text-center border border-purple-500/30">
                        <span className="text-purple-300 font-bold block">👁 {unit.range}</span>
                        <span className="text-gray-400 text-[8px]">Range</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="bg-gradient-to-r from-blue-600/50 to-blue-700/50 px-2.5 py-1.5 border-t-2 border-blue-500/50 flex items-center justify-between">
                  <span className="text-blue-100 text-[9px] font-bold">Level 9</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map((i) => (
                      <span key={i} className="text-yellow-300 text-xs">★</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM CONTROLS */}
      <div className="px-6 pb-4 z-10 relative">
        <button
          onClick={onBattleClick}
          className="w-full h-16 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-3xl border-b-[8px] border-yellow-700 shadow-2xl flex items-center justify-center transition-all active:translate-y-2 active:border-b-4 hover:from-yellow-200 hover:to-yellow-400 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <div className="relative flex items-center gap-3">
            <Sword className="text-yellow-900 drop-shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-transform" size={36} />
            <span className="text-yellow-900 font-black text-2xl drop-shadow-lg tracking-wider uppercase">Go To Battle</span>
          </div>
        </button>
      </div>

      {/* FOOTER NAVIGATION */}
      <div className="h-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 flex justify-center items-center gap-2 border-t-4 border-blue-500/40 z-20 w-full px-4 shadow-2xl backdrop-blur-md">
        {[
          { icon: ShoppingCart, label: 'SHOP', color: 'text-emerald-400', onClick: onShopClick },
          { icon: Layers, label: 'CARDS', color: 'text-purple-400', active: true },
          { icon: Sword, label: 'BATTLE', color: 'text-yellow-400', onClick: onBattleClick },
          { icon: Users, label: 'SOCIAL', color: 'text-pink-400', onClick: onClansClick },
          { icon: Calendar, label: 'EVENTS', color: 'text-cyan-400' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={item.onClick}
              className={`flex flex-col items-center cursor-pointer px-3 py-2 rounded-2xl transition-all group relative flex-shrink-0 ${
                item.active
                  ? 'bg-gradient-to-b from-yellow-500/30 to-yellow-600/10 -translate-y-2'
                  : 'hover:bg-white/5'
              }`}
            >
              {item.active && <div className="absolute -top-1 w-6 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>}
              <Icon size={24} className={`${item.color} drop-shadow-lg group-hover:scale-125 transition-transform`} />
              <span className={`text-[7px] font-black mt-0.5 tracking-widest uppercase drop-shadow-md whitespace-nowrap ${item.active ? 'text-yellow-300' : 'text-gray-400 group-hover:text-white'} transition-colors`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
