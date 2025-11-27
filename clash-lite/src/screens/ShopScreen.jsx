import React from 'react';
import { ShoppingCart, Layers, Sword, Users, Calendar, Crown, Shield, X } from 'lucide-react';

export const ShopScreen = ({ onClose, onBattleClick, onCardsClick, onClansClick }) => {
  const offers = [
    {
      name: 'Royal Starter Pack',
      price: '$49.00',
      time: '2d 21h',
      items: [
        { icon: '💰', amount: '10000' },
        { icon: '💎', amount: '500' },
        { icon: '👤', amount: '×20' },
      ],
      featured: true,
    },
    {
      name: 'Upgrade Special',
      items: [
        { icon: '⭐', amount: '2/2', available: true },
        { icon: '⭐', amount: '2/2', available: true },
        { icon: '⭐', amount: '4/4', available: true },
      ],
      time: '3d 23h',
    },
  ];

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
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-blue-300 text-[10px] font-bold tracking-widest uppercase opacity-80">Level</span>
            <span className="text-white text-xl font-black drop-shadow-md">KSV</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-gradient-to-br from-yellow-500/40 to-amber-600/40 px-4 py-2 rounded-xl border-2 border-yellow-400/60 backdrop-blur-sm shadow-lg">
            <span className="text-yellow-300 font-black text-lg">💰</span>
            <span className="text-yellow-100 font-bold text-sm drop-shadow-md">88</span>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-br from-green-500/40 to-emerald-600/40 px-4 py-2 rounded-xl border-2 border-green-400/60 backdrop-blur-sm shadow-lg">
            <span className="text-green-300 font-black text-lg">💎</span>
            <span className="text-green-100 font-bold text-sm drop-shadow-md">100</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full border-2 border-red-400 flex items-center justify-center hover:scale-110 transition-all shadow-lg"
        >
          <X className="text-white" size={24} />
        </button>
      </div>

      {/* SHOP TITLE */}
      <div className="px-6 py-4 text-center">
        <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 px-8 py-3 rounded-2xl border-4 border-yellow-600 shadow-2xl">
          <h1 className="text-3xl font-black text-yellow-900 drop-shadow-lg tracking-wider">OFFERS</h1>
        </div>
      </div>

      {/* SHOP CONTENT */}
      <div className="flex-1 px-6 overflow-y-auto pb-4">
        <div className="space-y-6">
          {offers.map((offer, idx) => (
            <div
              key={idx}
              className={`rounded-2xl overflow-hidden shadow-2xl border-4 ${
                offer.featured
                  ? 'border-yellow-500 bg-gradient-to-b from-yellow-500/20 via-green-500/10 to-slate-900/50'
                  : 'border-blue-500 bg-gradient-to-b from-blue-500/20 via-slate-900/20 to-slate-900/50'
              }`}
            >
              {/* Header */}
              <div className={`px-4 py-3 border-b-2 ${offer.featured ? 'border-yellow-600 bg-gradient-to-r from-yellow-600/40 to-orange-600/40' : 'border-blue-600 bg-gradient-to-r from-blue-600/40 to-slate-700/40'}`}>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-white font-black text-lg drop-shadow-md">{offer.name}</h2>
                  <div className={`px-3 py-1 rounded-full font-black text-sm ${offer.featured ? 'bg-yellow-400 text-yellow-900' : 'bg-blue-400 text-blue-900'}`}>
                    ⏱ {offer.time}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {offer.featured ? (
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {offer.items.map((item, i) => (
                      <div key={i} className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-3 border-2 border-slate-600 text-center shadow-lg">
                        <div className="text-3xl mb-2">{item.icon}</div>
                        <div className="text-yellow-300 font-black text-sm">{item.amount}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {offer.items.map((item, i) => (
                      <div key={i} className={`rounded-xl p-3 border-3 text-center shadow-lg ${
                        item.available 
                          ? 'bg-gradient-to-br from-purple-500/40 to-purple-700/40 border-purple-500'
                          : 'bg-gradient-to-br from-slate-600/40 to-slate-800/40 border-slate-500'
                      }`}>
                        <div className="text-3xl mb-2">{item.icon}</div>
                        <div className={`font-black text-sm ${item.available ? 'text-purple-200' : 'text-slate-300'}`}>
                          {item.amount}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Price */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-gradient-to-b from-blue-400 to-blue-600 hover:from-blue-300 hover:to-blue-500 text-white font-black py-3 rounded-xl border-2 border-blue-300 shadow-lg transition-all active:translate-y-1">
                    {offer.featured ? offer.price : 'CLAIM'}
                  </button>
                  {offer.featured && (
                    <button className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-800 hover:from-slate-500 hover:to-slate-700 text-slate-300 font-black rounded-xl border-2 border-slate-500 shadow-lg transition-all active:translate-y-1 flex items-center justify-center">
                      ℹ️
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER NAVIGATION */}
      <div className="h-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 flex justify-center items-center gap-2 border-t-4 border-blue-500/40 z-20 w-full px-4 shadow-2xl backdrop-blur-md">
        {[
          { icon: ShoppingCart, label: 'SHOP', color: 'text-emerald-400', active: true, onClick: () => {} },
          { icon: Layers, label: 'CARDS', color: 'text-purple-400', onClick: onCardsClick },
          { icon: Sword, label: 'BATTLE', color: 'text-yellow-400', onClick: onBattleClick },
          { icon: Users, label: 'SOCIAL', color: 'text-pink-400', onClick: onClansClick },
          { icon: Calendar, label: 'EVENTS', color: 'text-cyan-400', onClick: onBattleClick },
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
