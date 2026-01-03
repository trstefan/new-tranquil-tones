import React from 'react';
import Link from 'next/link';
import { Leaf, Plus } from 'lucide-react';
import { Timer } from './Timer';

interface SanctuaryHeaderProps {
  onContributeClick: () => void;
  onTimerComplete: () => void;
  onTimerFade: (volume: number) => void;
  isGlobalPlaying: boolean;
}

export const SanctuaryHeader = ({ 
  onContributeClick, 
  onTimerComplete, 
  onTimerFade, 
  isGlobalPlaying 
}: SanctuaryHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-stone-950/40 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-20 md:h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-moss-200 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-700">
            <Leaf className="text-stone-950 w-4 h-4 md:w-5 md:h-5" />
          </div>
          <div className="text-left">
            <h1 className="text-base md:text-lg font-outfit font-medium tracking-widest uppercase text-moss-100">Tranquil Tones</h1>
            <p className="text-[8px] md:text-[9px] text-moss-500 uppercase tracking-[0.3em] font-bold">Sanctuary</p>
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
          <button 
            onClick={onContributeClick}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-moss-500 hover:text-moss-100 hover:bg-white/10 transition-all group"
            title="Contribute"
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-90 transition-transform duration-500" />
          </button>
          <Timer 
            onComplete={onTimerComplete} 
            onFade={onTimerFade} 
            isAudioPlaying={isGlobalPlaying}
          />
        </div>
      </div>
    </header>
  );
};
