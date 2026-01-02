
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Timer as TimerIcon, Coffee, Moon, Play, Pause, RotateCcw, X } from 'lucide-react';
import { TimerMode } from '../types';

interface TimerProps {
  onComplete: () => void;
  onFade: (progress: number) => void;
  isAudioPlaying: boolean;
}

export const Timer = ({ onComplete, onFade, isAudioPlaying }: TimerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(1500); // 25 mins default
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(25);
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      onComplete();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft, onComplete]);

  // Handle sleep fade
  useEffect(() => {
    if (mode === 'sleep' && isActive) {
      const totalSeconds = duration * 60;
      const progress = timeLeft / totalSeconds;
      if (timeLeft < 300) { // Start fade in last 5 minutes
        onFade(timeLeft / 300);
      }
    }
  }, [timeLeft, mode, isActive, duration, onFade]);

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full border transition-all
          ${isActive 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
          }
        `}
      >
        <TimerIcon className="w-4 h-4" />
        <span className="font-medium">{isActive ? formatTime(timeLeft) : 'Session'}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-4 w-72 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl z-50 p-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold font-outfit text-lg">Timer</h3>
            <button onClick={() => setIsOpen(false)}><X className="w-4 h-4 text-zinc-500 hover:text-white" /></button>
          </div>

          <div className="flex bg-zinc-950 p-1 rounded-xl mb-6">
            {(['focus', 'relax', 'sleep'] as TimerMode[]).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setDuration(m === 'focus' ? 25 : m === 'relax' ? 10 : 60); }}
                className={`flex-1 flex flex-col items-center py-2 rounded-lg transition-all capitalize text-[10px] gap-1
                  ${mode === m ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}
                `}
              >
                {m === 'focus' && <TimerIcon className="w-3.5 h-3.5" />}
                {m === 'relax' && <Coffee className="w-3.5 h-3.5" />}
                {m === 'sleep' && <Moon className="w-3.5 h-3.5" />}
                {m}
              </button>
            ))}
          </div>

          <div className="text-center mb-6">
            <div className="text-4xl font-outfit font-light tracking-wider mb-2">
              {formatTime(timeLeft)}
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="range" 
                min="1" 
                max="120" 
                value={duration} 
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="flex-1 accent-emerald-500 h-1 bg-zinc-800 rounded-full appearance-none cursor-pointer"
              />
              <span className="text-xs text-zinc-500 w-12">{duration}m</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={toggleTimer}
              className={`flex-[2] flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all
                ${isActive 
                  ? 'bg-zinc-800 text-white hover:bg-zinc-700' 
                  : 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400'
                }
              `}
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isActive ? 'Pause' : 'Start'}
            </button>
            <button 
              onClick={resetTimer}
              className="flex-1 flex items-center justify-center bg-zinc-800 text-zinc-400 hover:text-white rounded-xl py-3 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
          
          {mode === 'sleep' && (
            <p className="mt-4 text-[10px] text-zinc-500 text-center">
              Audio will gradually fade out during the last 5 minutes.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
