import React from 'react';
import { Star, ShoppingCart, Layers, Sword, Users, Calendar, Plus, Trophy, Crown, Shield } from 'lucide-react';
import { UnitModel } from '../components/UnitModels';

export const MenuScreen = ({ onBattleClick, onCardsClick, onShopClick, onClansClick }) => {
  return (
    <div className="absolute inset-0 w-full h-full flex flex-col bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      {/* Background Pattern - Subtle animated grid */}
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

      {/* MAIN FEATURED ITEM */}
      <div className="flex-1 flex flex-col items-center justify-start pt-4 px-4 relative z-10">
        
        {/* Featured Sword/Weapon Graphic */}
        <div className="w-full max-w-sm h-32 bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800 rounded-2xl border-4 border-purple-400/60 shadow-2xl relative overflow-hidden mb-6 group cursor-pointer transform hover:scale-105 transition-all">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="transform -rotate-12 scale-125 drop-shadow-2xl">
              <Sword className="text-yellow-300 fill-yellow-300 drop-shadow-lg" size={100} />
            </div>
          </div>
          <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-lg border-2 border-yellow-600 shadow-lg">
            <span className="text-yellow-900 font-black text-xs drop-shadow-md">NEW!</span>
          </div>
        </div>

        {/* Profile / Arena Card - 3D Effect */}
        <div className="w-64 h-36 relative mb-5 group cursor-pointer" onClick={onBattleClick}>
          {/* Shadow/3D Base */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 rounded-2xl transform translate-y-3 blur-xl"></div>
          
          {/* Main Card */}
          <div className="relative w-full h-full bg-gradient-to-b from-green-400 to-green-600 rounded-2xl border-6 border-yellow-600 shadow-2xl overflow-hidden transform hover:scale-105 transition-all">
            {/* Grass texture */}
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)' }}></div>
            
            {/* River in middle */}
            <div className="absolute w-full h-8 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-400 to-blue-500 border-y-3 border-blue-700 shadow-inner"></div>
            
            {/* Towers representation */}
            <div className="absolute inset-0 flex items-center justify-between px-6">
              <div className="w-6 h-16 bg-gradient-to-t from-amber-900 to-amber-700 border-2 border-yellow-900 rounded-sm shadow-lg"></div>
              <div className="flex flex-col items-center">
                <div className="w-5 h-20 bg-gradient-to-t from-amber-800 to-amber-600 border-2 border-yellow-800 rounded-sm shadow-xl"></div>
                <span className="text-white font-bold text-xs mt-2 drop-shadow-lg">Training</span>
              </div>
              <div className="w-6 h-16 bg-gradient-to-t from-amber-900 to-amber-700 border-2 border-yellow-900 rounded-sm shadow-lg"></div>
            </div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
          </div>
        </div>

        {/* Deck Slots */}
        <div className="flex gap-3 mb-6 px-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-14 h-16 bg-gradient-to-br from-yellow-600 to-yellow-800 border-3 border-yellow-700 rounded-xl flex items-center justify-center shadow-2xl hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-110 cursor-pointer group relative"
            >
              <Plus className="text-yellow-200 drop-shadow-lg group-hover:scale-125 transition-transform" size={20} />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-red-400 to-red-600 rounded-full text-[9px] text-white font-black flex items-center justify-center border border-red-700 shadow-lg">
                {i}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM CONTROLS */}
      <div className="px-4 pb-2 z-10 relative mt-auto">
        <div className="flex items-center justify-center gap-2">
          {/* Deck Preview Card */}
          <button className="w-14 h-16 bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg border-3 border-slate-500 shadow-2xl flex items-center justify-center hover:scale-110 transition-all hover:from-slate-500 hover:to-slate-700 group relative flex-shrink-0">
            <div className="w-12 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center border-2 border-blue-300 shadow-xl overflow-hidden">
              <div className="scale-40 group-hover:scale-50 transition-transform">
                <UnitModel type="KNIGHT" team="player" isCardView={true} />
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full text-[8px] text-white font-black flex items-center justify-center border-2 border-blue-300 shadow-lg">1</div>
          </button>

          {/* MAIN BATTLE BUTTON */}
          <button
            onClick={onBattleClick}
            className="flex-1 h-16 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-2xl border-b-[6px] border-yellow-700 shadow-2xl flex items-center justify-center transition-all active:translate-y-1 active:border-b-3 hover:from-yellow-200 hover:to-yellow-400 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className="relative flex items-center gap-2">
              <Sword className="text-yellow-900 drop-shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-transform" size={32} />
              <span className="text-yellow-900 font-black text-xl drop-shadow-lg tracking-wider uppercase">BATTLE</span>
            </div>
          </button>

          {/* Rank Button */}
          <button className="w-14 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg border-3 border-blue-300 shadow-2xl flex flex-col items-center justify-center hover:scale-110 transition-all hover:from-blue-300 hover:to-blue-500 group flex-shrink-0">
            <Trophy className="text-yellow-300 fill-yellow-300 drop-shadow-lg group-hover:scale-125 transition-transform" size={24} />
            <span className="text-white font-black text-xs drop-shadow-md group-hover:scale-110 transition-transform">0</span>
          </button>
        </div>
      </div>

      {/* FOOTER NAVIGATION */}
      <div className="h-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 flex justify-center items-center gap-2 border-t-4 border-blue-500/40 z-20 w-full px-4 shadow-2xl backdrop-blur-md">
        {[
          { icon: ShoppingCart, label: 'SHOP', color: 'text-emerald-400', onClick: onShopClick },
          { icon: Layers, label: 'CARDS', color: 'text-purple-400', onClick: onCardsClick },
          { icon: Sword, label: 'BATTLE', color: 'text-yellow-400', active: true, onClick: onBattleClick },
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
