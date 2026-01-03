import React from 'react';
import { Info } from 'lucide-react';
import { SoundCard } from './SoundCard';
import { ActiveSound } from '@/types';
import { SOUNDS } from '@/constants'; // Assuming activeSounds will come from props, but SOUNDS is needed for the list

interface SoundGridProps {
  activeSounds: ActiveSound[];
  isGlobalPlaying: boolean;
  onToggleSound: (id: string, isAdding: boolean) => void;
  onUpdateVolume: (id: string, volume: number) => void;
  onSetActivePresetId: (id: string | null) => void;
  onToggleGlobal: () => void;
}

export const SoundGrid = ({
  activeSounds,
  isGlobalPlaying,
  onToggleSound,
  onUpdateVolume,
  onSetActivePresetId,
  onToggleGlobal
}: SoundGridProps) => {

  const handleToggle = (id: string) => {
    const isAdding = !activeSounds.some(s => s.id === id);
    if (isAdding && !isGlobalPlaying) {
      onToggleGlobal();
    }
    onToggleSound(id, isAdding);
    onSetActivePresetId(null);
  };

  return (
    <div className="lg:col-span-9 animate-slide-up [animation-delay:200ms]">
      <header className="mb-12 md:mb-20">
        <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif italic text-moss-100 mb-6 md:mb-8 leading-tight">
          Compose your <br /><span className="text-moss-500 not-italic">landscape.</span>
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 md:gap-8">
          <p className="text-moss-400 font-light text-lg md:text-xl max-w-xl leading-relaxed">
            Layer organic textures to craft an environment that speaks to your soul. 
            Find the perfect balance between nature and focus.
          </p>
          {activeSounds.length === 0 && (
            <div className="flex items-center gap-3 px-5 py-3 md:px-6 md:py-4 rounded-3xl bg-moss-200/5 border border-moss-200/20 animate-bounce-slow w-fit">
              <Info className="w-4 h-4 md:w-5 md:h-5 text-moss-300" />
              <p className="text-xs md:text-sm font-medium text-moss-200">Select sounds to begin</p>
            </div>
          )}
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10 pb-32 lg:pb-0">
        {SOUNDS.map(sound => (
          <SoundCard
            key={sound.id}
            sound={sound}
            isActive={activeSounds.some(s => s.id === sound.id)}
            volume={activeSounds.find(s => s.id === sound.id)?.volume || 0.5}
            onToggle={handleToggle}
            onVolumeChange={onUpdateVolume}
            isGlobalPlaying={isGlobalPlaying}
          />
        ))}
      </div>
    </div>
  );
};
