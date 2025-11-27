import React from 'react';
import { ShoppingCart, Layers, Sword, Users, Calendar, Crown, Shield, Search } from 'lucide-react';

export const ClansScreen = ({ onBattleClick, onShopClick, onCardsClick }) => {
  return (
    <div className="absolute inset-0 w-full h-full flex flex-col bg-gradient-to-b from-teal-900 via-teal-800 to-slate-950">
      {/* Background Pattern - Water effect */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(100, 200, 200, 0.3) 0%, transparent 50%),radial-gradient(circle at 80% 80%, rgba(100, 200, 200, 0.3) 0%, transparent 50%)',
        }}
      ></div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* TOP HEADER */}
      <div className="px-6 py-8 text-center relative z-10">
        <div className="inline-block mb-4">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-3xl border-4 border-yellow-500 shadow-2xl flex items-center justify-center mb-4">
            <Users className="text-white fill-white" size={56} />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-8 py-3 rounded-3xl border-b-4 border-purple-800 inline-block shadow-2xl mb-4">
          <h1 className="text-3xl font-black text-white drop-shadow-lg tracking-wider">Clans</h1>
        </div>
        <p className="text-white text-center text-sm font-bold max-w-xs mx-auto drop-shadow-lg leading-relaxed">
          Join a Clan and set sail to unlock rewards in Clan Wars!
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 px-6 pb-6 flex flex-col items-center justify-center relative z-10">
        {/* Shark graphic */}
        <div className="text-6xl mb-8 animate-bounce">🦈</div>

        {/* Search/Create Box */}
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-gray-300">
          <div className="px-6 py-4 flex items-center gap-3 bg-gradient-to-r from-slate-100 to-gray-50">
            <Search className="text-slate-600" size={24} />
            <input
              type="text"
              placeholder="Search or create a new clan!"
              className="flex-1 bg-transparent text-slate-700 font-bold placeholder-slate-400 outline-none text-sm"
            />
          </div>
          <div className="px-6 py-4 bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center cursor-pointer hover:from-purple-400 hover:to-purple-500 transition-all">
            <button className="text-white font-black text-lg drop-shadow-lg">SHOW</button>
          </div>
        </div>
      </div>

      {/* FOOTER NAVIGATION */}
      <div className="h-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 flex justify-center items-center gap-2 border-t-4 border-blue-500/40 z-20 w-full px-4 shadow-2xl backdrop-blur-md">
        {[
          { icon: ShoppingCart, label: 'SHOP', color: 'text-emerald-400', onClick: onShopClick },
          { icon: Layers, label: 'CARDS', color: 'text-purple-400', onClick: onCardsClick },
          { icon: Sword, label: 'BATTLE', color: 'text-yellow-400', onClick: onBattleClick },
          { icon: Users, label: 'SOCIAL', color: 'text-pink-400', active: true },
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

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};
