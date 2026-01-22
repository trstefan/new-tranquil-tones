import React from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ActiveSound } from "@/types";
import { SOUNDS, getIcon } from "@/constants";

interface ControlBarProps {
  isExpanded: boolean;
  onToggleExpand: () => void;
  isGlobalPlaying: boolean;
  onToggleGlobal: () => void;
  activeSounds: ActiveSound[];
  masterVolume: number;
  onSetMasterVolume: (volume: number) => void;
}

export const ControlBar = ({
  isExpanded,
  onToggleExpand,
  isGlobalPlaying,
  onToggleGlobal,
  activeSounds,
  masterVolume,
  onSetMasterVolume,
}: ControlBarProps) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 px-6 md:px-10 pb-8 md:pb-12 pointer-events-none flex justify-center">
      <div
        className={`
          bg-stone-950/80 backdrop-blur-3xl border shadow-2xl relative overflow-hidden pointer-events-auto transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col
          ${
            isExpanded
              ? "w-full max-w-275 rounded-[3rem] md:rounded-[4rem] p-6 md:p-10 border-white/10"
              : "w-auto rounded-full p-2.5 md:p-3 pr-6 md:pr-8 border-white/5 hover:border-white/10"
          }
          ${!isExpanded && isGlobalPlaying ? "shadow-[0_0_40px_-5px_rgba(130,156,130,0.3)] border-moss-500/30" : ""}
        `}
      >
        <div
          className={`flex flex-col sm:flex-row items-center gap-6 ${isExpanded ? "sm:gap-12 w-full" : "gap-3 md:gap-4"} relative z-10`}
        >
          {/* Play/Pause Button Group */}
          <div className="flex items-center gap-4 md:gap-5 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={onToggleGlobal}
              className={`
                flex items-center justify-center rounded-full transition-all duration-700 group relative
                ${isExpanded ? "w-16 h-16 md:w-24 md:h-24" : "w-12 h-12 md:w-14 md:h-14"}
                ${
                  isGlobalPlaying
                    ? "bg-moss-200 text-stone-950 shadow-xl shadow-moss-400/20"
                    : "bg-white/5 text-moss-400 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              {isGlobalPlaying ? (
                <Pause
                  className={
                    isExpanded
                      ? "w-6 h-6 md:w-10 md:h-10"
                      : "w-4 h-4 md:w-5 md:h-5"
                  }
                />
              ) : (
                <Play
                  className={`${isExpanded ? "w-6 h-6 md:w-10 md:h-10 ml-1" : "w-4 h-4 md:w-5 md:h-5 ml-0.5"}`}
                />
              )}

              {isGlobalPlaying && (
                <div
                  className={`absolute inset-0 rounded-full bg-moss-200/30 animate-ping opacity-20 ${!isExpanded && "hidden"}`}
                ></div>
              )}
            </button>

            {!isExpanded && (
              <div className="flex items-center gap-3 md:gap-4 animate-fade-in mr-auto sm:mr-0 pl-2">
                <div className="flex flex-col">
                  <p className="text-[8px] md:text-[9px] text-moss-500 uppercase font-bold tracking-[0.2em] leading-none mb-1.5">
                    Session
                  </p>
                  <p className="text-lg md:text-xl font-serif italic text-moss-100 leading-none">
                    {activeSounds.length}{" "}
                    <span className="text-xs md:text-sm font-sans not-italic text-moss-500 font-normal ml-1">
                      layers
                    </span>
                  </p>
                </div>
              </div>
            )}
            {/* Mobile Expand Toggle (Only visible when collapsed on mobile) */}
            {!isExpanded && (
              <button
                onClick={onToggleExpand}
                className="sm:hidden flex items-center justify-center w-8 h-8 rounded-full bg-white/3 text-moss-400"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            )}
          </div>

          {isExpanded && (
            <>
              <div className="flex-1 w-full space-y-4 md:space-y-6 animate-slide-up">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4">
                  <div className="flex items-center gap-3 md:gap-4">
                    <span className="text-[9px] md:text-[11px] text-moss-500 font-bold uppercase tracking-[0.3em]">
                      Master Composition
                    </span>
                    <div className="flex -space-x-2 overflow-x-auto pb-1 max-w-37.5 sm:max-w-none no-scrollbar">
                      {activeSounds.map((s) => {
                        const sound = SOUNDS.find((snd) => snd.id === s.id);
                        return sound ? (
                          <div
                            key={s.id}
                            className="min-w-7 w-7 h-7 md:min-w-8 md:w-8 md:h-8 rounded-full bg-stone-950 border border-white/10 flex items-center justify-center text-moss-300 animate-slide-up shadow-lg"
                          >
                            {getIcon(sound.icon, "w-3.5 h-3.5 md:w-4 h-4")}
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                  <span className="self-end sm:self-auto text-moss-200 font-mono text-sm md:text-lg">
                    {Math.round(masterVolume * 100)}%
                  </span>
                </div>

                <div className="flex items-center gap-3 md:gap-8">
                  <button
                    onClick={() =>
                      onSetMasterVolume(masterVolume === 0 ? 0.8 : 0)
                    }
                    className="transition-transform active:scale-90"
                  >
                    {masterVolume === 0 ? (
                      <VolumeX className="w-4 h-4 md:w-6 md:h-6 text-moss-600" />
                    ) : (
                      <Volume2 className="w-4 h-4 md:w-6 md:h-6 text-moss-400" />
                    )}
                  </button>
                  <div className="flex-1 relative h-1.5 md:h-2 group cursor-pointer">
                    <div className="absolute inset-0 bg-white/5 rounded-full overflow-hidden">
                      {isGlobalPlaying && (
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-mist-drift opacity-30"></div>
                      )}
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={masterVolume}
                      onChange={(e) =>
                        onSetMasterVolume(parseFloat(e.target.value))
                      }
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div
                      className="absolute top-0 bottom-0 left-0 bg-moss-200 rounded-full shadow-[0_0_15px_rgba(197,208,197,0.3)] transition-all duration-150 pointer-events-none"
                      style={{ width: `${masterVolume * 100}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block border-l border-white/10 h-16 mx-4"></div>

              <div className="hidden lg:flex items-center gap-6 animate-slide-up">
                <div className="text-right">
                  <p className="text-[11px] text-moss-500 uppercase tracking-widest font-bold mb-1">
                    Active Textures
                  </p>
                  <p className="text-5xl font-serif italic text-moss-100 tabular-nums">
                    {activeSounds.length}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Desktop Expansion Toggle / Mobile Collapse */}
          <button
            onClick={onToggleExpand}
            className={`
              items-center justify-center rounded-full bg-white/5 text-moss-400 hover:bg-white/10 hover:text-moss-100 transition-all duration-500
              hidden sm:flex
              ${isExpanded ? "p-3 self-center sm:self-auto" : "w-10 h-10 bg-white/3 hover:bg-white/8 ml-2"}
            `}
            title={isExpanded ? "Collapse Controls" : "Expand Controls"}
          >
            {isExpanded ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </button>

          {/* Mobile Collapse (Only visible when expanded on mobile) */}
          {isExpanded && (
            <button
              onClick={onToggleExpand}
              className="sm:hidden w-full py-2 flex items-center justify-center text-moss-500"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
