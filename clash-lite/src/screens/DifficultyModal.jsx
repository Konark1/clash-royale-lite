import React from 'react';
import { Brain, Trophy, Crown } from 'lucide-react';

export const DifficultyModal = ({ onSelect, onCancel }) => {
  return (
    <div className="absolute inset-0 bg-black/90 z-[60] flex items-center justify-center backdrop-blur-md">
      <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-8 rounded-3xl border-8 border-gradient-to-br from-yellow-400 to-yellow-600 w-[320px] text-center shadow-2xl animate-pop-in relative overflow-visible">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>
        
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 px-8 py-2 rounded-2xl border-4 border-yellow-600 text-black font-black uppercase tracking-wider shadow-xl z-10 text-sm">
          <span>⚔️ Choose Difficulty</span>
        </div>
        
        <div className="flex flex-col gap-4 mt-12 relative z-10">
          <button
            onClick={() => onSelect('EASY')}
            className="bg-gradient-to-b from-green-400 to-green-600 hover:from-green-300 hover:to-green-500 text-white font-bold py-5 px-4 rounded-2xl border-b-4 border-green-800 active:border-b-0 active:translate-y-1 transition-all shadow-lg flex items-center justify-center gap-3 group"
          >
            <Brain size={24} className="group-hover:scale-125 transition-transform" />
            <span className="text-lg tracking-wider">EASY</span>
          </button>
          
          <button
            onClick={() => onSelect('MEDIUM')}
            className="bg-gradient-to-b from-blue-400 to-blue-600 hover:from-blue-300 hover:to-blue-500 text-white font-bold py-5 px-4 rounded-2xl border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 transition-all shadow-lg flex items-center justify-center gap-3 group"
          >
            <Trophy size={24} className="group-hover:scale-125 transition-transform" />
            <span className="text-lg tracking-wider">MEDIUM</span>
          </button>
          
          <button
            onClick={() => onSelect('HARD')}
            className="bg-gradient-to-b from-red-400 to-red-600 hover:from-red-300 hover:to-red-500 text-white font-bold py-5 px-4 rounded-2xl border-b-4 border-red-800 active:border-b-0 active:translate-y-1 transition-all shadow-lg flex items-center justify-center gap-3 group"
          >
            <Crown size={24} className="group-hover:scale-125 transition-transform" />
            <span className="text-lg tracking-wider">HARD</span>
          </button>
        </div>
        
        <button 
          onClick={onCancel} 
          className="mt-8 text-gray-600 text-xs font-bold hover:text-gray-900 uppercase tracking-widest transition-colors relative z-10"
        >
          ✕ Cancel
        </button>
      </div>
    </div>
  );
};
