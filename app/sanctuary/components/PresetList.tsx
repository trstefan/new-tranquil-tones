import React from 'react';
import { Cloud, Plus, ChevronRight, Trash2 } from 'lucide-react';
import { PRESETS } from '@/constants';
import { Preset, ActiveSound } from '@/types';

interface PresetListProps {
  activePresetId: string | null;
  userPresets: Preset[];
  activeSounds: ActiveSound[];
  onSetPreset: (preset: Preset) => void;
  onSavePreset: () => void;
  onDeletePreset: (id: string) => void;
}

export const PresetList = ({
  activePresetId,
  userPresets,
  activeSounds,
  onSetPreset,
  onSavePreset,
  onDeletePreset
}: PresetListProps) => {
  return (
    <div className="lg:col-span-3 space-y-10 md:space-y-12 animate-slide-up">
      {/* Earthly Sets */}
      <section>
        <h2 className="text-[10px] font-bold text-moss-500 uppercase tracking-[0.4em] mb-6 md:mb-10 flex items-center gap-3">
          <Cloud className="w-3.5 h-3.5" /> Earthly Sets
        </h2>
        <div className="space-y-3 md:space-y-4">
          {PRESETS.map(preset => {
            const isActiveSet = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => onSetPreset(preset)}
                className={`
                  w-full text-left p-5 md:p-6 rounded-[2rem] md:rounded-[2.2rem] border transition-all duration-500 group relative overflow-hidden
                  ${isActiveSet 
                    ? 'bg-moss-500/10 border-moss-400/20 shadow-xl' 
                    : 'bg-white/[0.02] border-white/5 hover:border-moss-500/30 hover:bg-white/[0.05]'
                  }
                `}
              >
                {isActiveSet && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-moss-200 to-moss-500 animate-pulse" />
                )}
                <div className="flex justify-between items-center mb-1">
                  <p className={`font-outfit font-medium tracking-wide transition-colors text-base md:text-lg ${isActiveSet ? 'text-moss-100' : 'text-moss-300 group-hover:text-moss-100'}`}>
                    {preset.name}
                  </p>
                  {isActiveSet && <ChevronRight className="w-4 h-4 text-moss-300" />}
                </div>
                <p className={`text-[10px] md:text-[11px] leading-relaxed transition-opacity duration-500 ${isActiveSet ? 'text-moss-400 opacity-100' : 'text-moss-500 opacity-60 group-hover:opacity-100'}`}>
                  {preset.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* User Mixes */}
      <section className="pt-8 md:pt-10 border-t border-white/5">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-[10px] font-bold text-moss-500 uppercase tracking-[0.4em] flex items-center gap-3">
            <Plus className="w-3.5 h-3.5" /> Your Mixes
          </h2>
          {activeSounds.length > 0 && (
            <button 
              onClick={onSavePreset}
              className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-moss-200 hover:text-white transition-colors px-3 py-1.5 bg-white/5 rounded-full"
            >
              Save Current
            </button>
          )}
        </div>
        
        <div className="space-y-3 md:space-y-4">
          {userPresets.length === 0 ? (
            <div className="p-10 md:p-12 rounded-[2rem] md:rounded-[2.2rem] border border-dashed border-white/10 text-center bg-white/[0.01]">
              <p className="text-[10px] text-moss-600 uppercase tracking-widest font-medium">No custom sets yet</p>
            </div>
          ) : (
            userPresets.map(preset => {
              const isActiveSet = activePresetId === preset.id;
              return (
                <div key={preset.id} className="group relative">
                  <button
                    onClick={() => onSetPreset(preset)}
                    className={`
                      w-full text-left p-5 md:p-6 rounded-[2rem] md:rounded-[2.2rem] border transition-all duration-500
                      ${isActiveSet 
                        ? 'bg-moss-500/10 border-moss-400/20 shadow-lg' 
                        : 'bg-white/[0.02] border-white/5 hover:border-moss-500/30'
                      }
                    `}
                  >
                    <p className={`font-outfit font-medium transition-colors text-base md:text-lg ${isActiveSet ? 'text-moss-100' : 'text-moss-400'}`}>{preset.name}</p>
                    <p className="text-[8px] md:text-[9px] text-moss-500 mt-1 uppercase tracking-[0.2em] font-bold">{preset.sounds.length} textures</p>
                  </button>
                  <button 
                    onClick={() => onDeletePreset(preset.id)}
                    className="absolute top-5 right-5 md:top-6 md:right-6 opacity-0 group-hover:opacity-100 p-2 text-moss-600 hover:text-red-400 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};
