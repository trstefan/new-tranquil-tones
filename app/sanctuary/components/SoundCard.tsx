import React, { useState, useRef } from "react";
import { getIcon } from "@/constants";
import { Sound } from "@/types";

interface SoundCardProps {
  sound: Sound;
  isActive: boolean;
  volume: number;
  onToggle: (id: string) => void;
  onVolumeChange: (id: string, volume: number) => void;
  isGlobalPlaying: boolean;
}

const WaveformBar: React.FC<{
  index: number;
  volume: number;
  isActive: boolean;
}> = ({ index, volume, isActive }) => {
  const delays = [0, 0.2, 0.4, 0.1, 0.3];
  const durations = [1.2, 0.8, 1.5, 1.0, 1.3];

  const delay = delays[index % 5];
  const duration = durations[index % 5];

  return (
    <div
      className={`w-1 rounded-full bg-moss-300 transition-all duration-700 ease-in-out ${
        isActive ? "opacity-80" : "opacity-0"
      }`}
      style={{
        height: isActive ? `${12 + volume * 18}px` : "4px",

        animationName: isActive ? "wave-pulse" : "none",
        animationDuration: `${duration}s`,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        animationDelay: `${delay}s`,
        animationFillMode: "both",

        transformOrigin: "bottom",
      }}
    />
  );
};

export const SoundCard: React.FC<SoundCardProps> = ({
  sound,
  isActive,
  volume,
  onToggle,
  onVolumeChange,
  isGlobalPlaying,
}) => {
  const isActuallyPlaying = isActive && isGlobalPlaying;
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: x * 10, y: y * -10 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onToggle(sound.id)}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.y}deg) rotateY(${rotate.x}deg)`,
      }}
      className={`
        relative group p-7 rounded-[3rem] transition-all duration-700 border cursor-pointer overflow-hidden
        ${
          isActive
            ? "bg-moss-500/10 border-moss-500/30 shadow-[0_0_40px_-5px_rgba(130,156,130,0.3)] scale-[1.02]"
            : "bg-white/3 border-white/5 hover:bg-white/6 hover:border-white/10"
        }
      `}
    >
      {/* Selection Ring */}
      {isActive && (
        <div className="absolute inset-0 border-2 border-moss-400/20 rounded-[inherit] pointer-events-none animate-pulse-slow"></div>
      )}

      {/* Internal Grain/Mist for texture */}
      <div
        className={`absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-1000 ${isActive ? "opacity-30" : "opacity-0"}`}
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-40"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-moss-500/20 blur-3xl animate-mist-drift"></div>
      </div>

      <div className="flex flex-col gap-5 md:gap-6 relative z-10">
        <div className="flex items-center justify-between">
          <div
            className={`
              w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-4xl md:rounded-[2.2rem] transition-all duration-700 relative
              ${
                isActive
                  ? "bg-moss-200 text-stone-950 shadow-lg scale-110"
                  : "bg-stone-900/60 text-moss-400 group-hover:text-moss-200"
              }
            `}
          >
            {getIcon(sound.icon, "w-6 h-6 md:w-7 md:h-7 relative z-10")}

            {isActuallyPlaying && (
              <div
                className="absolute inset-0 rounded-4xl md:rounded-[2.2rem] bg-moss-300/40 animate-ping"
                style={{ animationDuration: `${3 - volume * 2}s` }}
              ></div>
            )}
          </div>

          <div className="flex items-end gap-1 h-8 md:h-10 px-1 md:px-2">
            {[...Array(5)].map((_, i) => (
              <WaveformBar
                key={i}
                index={i}
                volume={volume}
                isActive={isActuallyPlaying}
              />
            ))}
          </div>
        </div>

        <div>
          <h3
            className={`font-outfit font-medium text-lg md:text-xl transition-colors ${isActive ? "text-moss-50" : "text-moss-300 group-hover:text-moss-100"}`}
          >
            {sound.name}
          </h3>
          <p className="text-[9px] md:text-[10px] text-moss-500 uppercase tracking-[0.25em] font-bold mt-1">
            {sound.type}
          </p>
        </div>

        <div
          onClick={(e) => e.stopPropagation()}
          className={`transition-all duration-700 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-4"}`}
        >
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[10px] text-moss-600 font-bold uppercase tracking-widest">
              <span>Texture Intensity</span>
              <span className="text-moss-300">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) =>
                onVolumeChange(sound.id, parseFloat(e.target.value))
              }
              className="w-full h-1 bg-moss-900/50 rounded-full appearance-none cursor-pointer accent-moss-300"
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wave-pulse {
          0%, 100% { transform: scaleY(1); opacity: 0.5; }
          50% { transform: scaleY(1.6); opacity: 0.9; }
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};
