'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Trash2, 
  Settings, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  Leaf,
  Wind,
  Droplets,
  Cloud,
  ChevronRight,
  ChevronDown,
  ChevronUp,  
  Info
} from 'lucide-react';
import { SOUNDS, PRESETS, getIcon } from '@/constants'

import { useAudioMixer } from '@/hooks/useAudioMixer';
import { Preset } from "@/types"

import {SoundCard} from '@/components/SoundCard';
import {Timer} from '@/components/Timer';
import { ContributeModal } from '@/components/ContributeModal';
import Link from 'next/link';



const page = () => {

 const {
    activeSounds,
    masterVolume,
    setMasterVolume,
    isGlobalPlaying,
    toggleGlobal,
    toggleSound,
    updateSoundVolume,
    setPreset,
    analyser,
    stopAll
  } = useAudioMixer();

  const [userPresets, setUserPresets] = useState<Preset[]>([]);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [isControlsExpanded, setIsControlsExpanded] = useState(false);
  const [isContributeOpen, setIsContributeOpen] = useState(false);



  useEffect(() => {
    const saved = localStorage.getItem('tranquil-user-presets');
    if (saved) setUserPresets(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('tranquil-user-presets', JSON.stringify(userPresets));
  }, [userPresets]);

  const saveCurrentAsPreset = () => {
    if (activeSounds.length === 0) return;
    const name = prompt('Enter preset name:', `My Sanctuary ${userPresets.length + 1}`);
    if (name) {
      const newPreset: Preset = {
        id: Date.now().toString(),
        name,
        description: 'Organic blend',
        sounds: [...activeSounds]
      };
      setUserPresets([...userPresets, newPreset]);
    }
  };

  const deletePreset = (id: string) => {
    setUserPresets(prev => prev.filter(p => p.id !== id));
  };

    const handleSetPreset = (preset: Preset) => {
    setPreset(preset.sounds);
    setActivePresetId(preset.id);
  }

  // Environmental reactivity
  const bgMistDensity = useMemo(() => Math.min(activeSounds.length * 0.1 + 0.05, 0.4), [activeSounds]);



  return (
    <div className="min-h-screen animate-fade-in pb-56 selection:bg-moss-500/30">
      <ContributeModal isOpen={isContributeOpen} onClose={() => setIsContributeOpen(false)} />
      {/* Background Atmosphere & Global Visualizer */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div 
          className="absolute inset-0 bg-stone-950 transition-colors duration-3000"
          style={{ backgroundColor: activeSounds.length > 3 ? '#0e1111' : '#111313' }}
        ></div>
        
        <div 
          className="absolute top-0 right-0 w-[80%] h-[80%] bg-moss-500/10 blur-[120px] rounded-full animate-mist-drift transition-opacity duration-2000"
          style={{ opacity: bgMistDensity }}
        ></div>
        <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-blue-500/5 blur-[120px] rounded-full animate-mist-drift" style={{ animationDelay: '-10s' }}></div>
        
       
      </div>

      {/* Navigation */}
     <header className="fixed top-0 left-0 right-0 z-40 bg-stone-950/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-10 h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-moss-200 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-700">
              <Leaf className="text-stone-950 w-5 h-5" />
            </div>
            <div className="text-left">
              <h1 className="text-lg font-outfit font-medium tracking-widest uppercase text-moss-100">Tranquil Tones</h1>
              <p className="text-[9px] text-moss-500 uppercase tracking-[0.3em] font-bold">Sanctuary</p>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsContributeOpen(true)}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-moss-500 hover:text-moss-100 hover:bg-white/10 transition-all group"
              title="Contribute"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
            </button>
            <Timer 
              onComplete={stopAll} 
              onFade={(p) => setMasterVolume(p * masterVolume)} 
              isAudioPlaying={isGlobalPlaying}
            />
          </div>
        </div>
      </header>

      <main className="pt-44 max-w-[1400px] mx-auto px-10 grid grid-cols-1 lg:grid-cols-12 gap-20 relative z-10">
        {/* Left Column - Collections Hierarchy */}
        <div className="lg:col-span-3 space-y-12 animate-slide-up">
          <section>
            <h2 className="text-[10px] font-bold text-moss-500 uppercase tracking-[0.4em] mb-10 flex items-center gap-3">
              <Cloud className="w-3.5 h-3.5" /> Earthly Sets
            </h2>
            <div className="space-y-4">
              {PRESETS.map(preset => {
                const isActiveSet = activePresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSetPreset(preset)}
                    className={`
                      w-full text-left p-6 rounded-[2.2rem] border transition-all duration-500 group relative overflow-hidden
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
                      <p className={`font-outfit font-medium tracking-wide transition-colors ${isActiveSet ? 'text-moss-100 text-lg' : 'text-moss-300 group-hover:text-moss-100'}`}>
                        {preset.name}
                      </p>
                      {isActiveSet && <ChevronRight className="w-4 h-4 text-moss-300" />}
                    </div>
                    <p className={`text-[11px] leading-relaxed transition-opacity duration-500 ${isActiveSet ? 'text-moss-400 opacity-100' : 'text-moss-500 opacity-60 group-hover:opacity-100'}`}>
                      {preset.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="pt-10 border-t border-white/5">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-[10px] font-bold text-moss-500 uppercase tracking-[0.4em] flex items-center gap-3">
                <Plus className="w-3.5 h-3.5" /> Your Mixes
              </h2>
              {activeSounds.length > 0 && (
                <button 
                  onClick={saveCurrentAsPreset}
                  className="text-[10px] uppercase tracking-[0.2em] font-bold text-moss-200 hover:text-white transition-colors px-3 py-1.5 bg-white/5 rounded-full"
                >
                  Save Current
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              {userPresets.length === 0 ? (
                <div className="p-12 rounded-[2.2rem] border border-dashed border-white/10 text-center bg-white/[0.01]">
                  <p className="text-[10px] text-moss-600 uppercase tracking-widest font-medium">No custom sets yet</p>
                </div>
              ) : (
                userPresets.map(preset => {
                  const isActiveSet = activePresetId === preset.id;
                  return (
                    <div key={preset.id} className="group relative">
                      <button
                        onClick={() => handleSetPreset(preset)}
                        className={`
                          w-full text-left p-6 rounded-[2.2rem] border transition-all duration-500
                          ${isActiveSet 
                            ? 'bg-moss-500/10 border-moss-400/20 shadow-lg' 
                            : 'bg-white/[0.02] border-white/5 hover:border-moss-500/30'
                          }
                        `}
                      >
                        <p className={`font-outfit font-medium transition-colors ${isActiveSet ? 'text-moss-100' : 'text-moss-400'}`}>{preset.name}</p>
                        <p className="text-[9px] text-moss-500 mt-1 uppercase tracking-[0.2em] font-bold">{preset.sounds.length} textures</p>
                      </button>
                      <button 
                        onClick={() => deletePreset(preset.id)}
                        className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 p-2 text-moss-600 hover:text-red-400 transition-all"
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

        {/* Right Column - Sound Grid */}
        <div className="lg:col-span-9 animate-slide-up [animation-delay:200ms]">
          <header className="mb-20">
            <h2 className="text-6xl md:text-8xl font-serif italic text-moss-100 mb-8 leading-tight">Compose your <br /><span className="text-moss-500 not-italic">landscape.</span></h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-8">
              <p className="text-moss-400 font-light text-xl max-w-xl leading-relaxed">
                Layer organic textures to craft an environment that speaks to your soul. 
                Find the perfect balance between nature and focus.
              </p>
              {activeSounds.length === 0 && (
                <div className="flex items-center gap-3 px-6 py-4 rounded-3xl bg-moss-200/5 border border-moss-200/20 animate-bounce-slow">
                  <Info className="w-5 h-5 text-moss-300" />
                  <p className="text-sm font-medium text-moss-200">Select sounds to begin your journey</p>
                </div>
              )}
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
            {SOUNDS.map(sound => (
              <SoundCard
                key={sound.id}
                sound={sound}
                isActive={activeSounds.some(s => s.id === sound.id)}
                volume={activeSounds.find(s => s.id === sound.id)?.volume || 0.5}
                onToggle={(id) => { 
                  const isAdding = !activeSounds.some(s => s.id === id);
                  if (isAdding && !isGlobalPlaying) {
                    toggleGlobal();
                  }
                  toggleSound(id); 
                  setActivePresetId(null); 
                }}
                onVolumeChange={updateSoundVolume}
                isGlobalPlaying={isGlobalPlaying}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Control Bar - Cleaner & Collapsible */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 px-10 pb-12 pointer-events-none flex justify-center">
        <div 
          className={`
            bg-stone-950/80 backdrop-blur-3xl border shadow-2xl relative overflow-hidden pointer-events-auto transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col
            ${isControlsExpanded 
              ? 'w-full max-w-[1100px] rounded-[4rem] p-10 border-white/10' 
              : 'w-auto rounded-full p-3 pr-8 border-white/5 hover:border-white/10'
            }
            ${!isControlsExpanded && isGlobalPlaying ? 'shadow-[0_0_40px_-5px_rgba(130,156,130,0.3)] border-moss-500/30' : ''}
          `}
        >
          {/* Subtle Visualizer Overlay */}
    

          <div className={`flex flex-col sm:flex-row items-center gap-8 ${isControlsExpanded ? 'sm:gap-12 w-full' : 'gap-4'} relative z-10`}>
            
            {/* Play/Pause Button Group */}
            <div className="flex items-center gap-5">
               <button
                onClick={toggleGlobal}
                className={`
                  flex items-center justify-center rounded-full transition-all duration-700 group relative
                  ${isControlsExpanded ? 'w-24 h-24' : 'w-14 h-14'}
                  ${isGlobalPlaying 
                    ? 'bg-moss-200 text-stone-950 shadow-xl shadow-moss-400/20' 
                    : 'bg-white/5 text-moss-400 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                {isGlobalPlaying 
                  ? <Pause className={isControlsExpanded ? "w-10 h-10" : "w-5 h-5"} /> 
                  : <Play className={`${isControlsExpanded ? "w-10 h-10 ml-1.5" : "w-5 h-5 ml-0.5"}`} />
                }
                
                {isGlobalPlaying && (
                  <div className={`absolute inset-0 rounded-full bg-moss-200/30 animate-ping opacity-20 ${!isControlsExpanded && 'hidden'}`}></div>
                )}
              </button>

              {!isControlsExpanded && (
                <div className="flex items-center gap-4 animate-fade-in">
                  <div className="flex flex-col">
                    <p className="text-[9px] text-moss-500 uppercase font-bold tracking-[0.2em] leading-none mb-1.5">Session</p>
                    <p className="text-xl font-serif italic text-moss-100 leading-none">{activeSounds.length} <span className="text-sm font-sans not-italic text-moss-500 font-normal ml-1">layers</span></p>
                  </div>
                </div>
              )}
            </div>

            {isControlsExpanded && (
              <>
                <div className="flex-1 w-full space-y-6 animate-slide-up">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="text-[11px] text-moss-500 font-bold uppercase tracking-[0.3em]">Master Composition</span>
                      <div className="flex -space-x-2">
                        {activeSounds.map(s => {
                          const sound = SOUNDS.find(snd => snd.id === s.id);
                          return sound ? (
                            <div key={s.id} className="w-8 h-8 rounded-full bg-stone-950 border border-white/10 flex items-center justify-center text-moss-300 animate-slide-up shadow-lg">
                              {getIcon(sound.icon, "w-4 h-4")}
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                    <span className="text-moss-200 font-mono text-lg">{Math.round(masterVolume * 100)}%</span>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <button 
                      onClick={() => setMasterVolume(masterVolume === 0 ? 0.8 : 0)}
                      className="transition-transform active:scale-90"
                    >
                      {masterVolume === 0 ? <VolumeX className="w-6 h-6 text-moss-600" /> : <Volume2 className="w-6 h-6 text-moss-400" />}
                    </button>
                    <div className="flex-1 relative h-2 group cursor-pointer">
                      <div className="absolute inset-0 bg-white/5 rounded-full overflow-hidden">
                        {isGlobalPlaying && (
                          <div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-mist-drift opacity-30"
                          ></div>
                        )}
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={masterVolume}
                        onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div 
                        className="absolute top-0 bottom-0 left-0 bg-moss-200 rounded-full shadow-[0_0_15px_rgba(197,208,197,0.3)] transition-all duration-150 pointer-events-none"
                        style={{ width: `${masterVolume * 100}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block border-l border-white/10 h-16 mx-4"></div>

                <div className="hidden sm:flex items-center gap-6 animate-slide-up">
                  <div className="text-right">
                    <p className="text-[11px] text-moss-500 uppercase tracking-widest font-bold mb-1">Active Textures</p>
                    <p className="text-5xl font-serif italic text-moss-100 tabular-nums">{activeSounds.length}</p>
                  </div>
                </div>
              </>
            )}

            {/* Expansion Toggle Button */}
            <button 
              onClick={() => setIsControlsExpanded(!isControlsExpanded)}
              className={`
                flex items-center justify-center rounded-full bg-white/5 text-moss-400 hover:bg-white/10 hover:text-moss-100 transition-all duration-500
                ${isControlsExpanded ? 'p-3 self-center sm:self-auto' : 'w-10 h-10 bg-white/[0.03] hover:bg-white/[0.08] ml-2'}
              `}
              title={isControlsExpanded ? "Collapse Controls" : "Expand Controls"}
            >
              {isControlsExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </footer>
      
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(0); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default page