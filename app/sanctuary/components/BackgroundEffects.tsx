import React from 'react';

interface BackgroundEffectsProps {
  activeCount: number;
}

export const BackgroundEffects = ({ activeCount }: BackgroundEffectsProps) => {
  // Calculate mist density based on active sounds
  const bgMistDensity = Math.min(activeCount * 0.1 + 0.05, 0.4);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <div 
        className="absolute inset-0 bg-stone-950 transition-colors duration-3000"
        style={{ backgroundColor: activeCount > 3 ? '#0e1111' : '#111313' }}
      ></div>
      
      <div 
        className="absolute top-0 right-0 w-[80%] h-[80%] bg-moss-500/10 blur-[120px] rounded-full animate-mist-drift transition-opacity duration-2000"
        style={{ opacity: bgMistDensity }}
      ></div>
      <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-blue-500/5 blur-[120px] rounded-full animate-mist-drift" style={{ animationDelay: '-10s' }}></div>
    </div>
  );
};
