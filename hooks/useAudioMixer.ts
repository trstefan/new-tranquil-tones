
import { useState, useRef, useEffect, useCallback } from 'react';
import { ActiveSound, Sound } from '../types';
import { SOUNDS } from '../constants';

export const useAudioMixer = () => {
  const [activeSounds, setActiveSounds] = useState<ActiveSound[]>([]);
  const [masterVolume, setMasterVolume] = useState(0.8);
  const [isGlobalPlaying, setIsGlobalPlaying] = useState(false);
  
  const audioRefs = useRef<{ [id: string]: HTMLAudioElement }>({});
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  // Fixed: Correct type for media element source nodes is MediaElementAudioSourceNode
  const sourceNodesRef = useRef<{ [id: string]: MediaElementAudioSourceNode }>({});

  const initAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      const analyser = ctx.createAnalyser();
      const masterGain = ctx.createGain();

      analyser.fftSize = 256;
      masterGain.connect(analyser);
      analyser.connect(ctx.destination);

      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      masterGainRef.current = masterGain;
    }
    
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  }, []);

  const toggleSound = useCallback((soundId: string) => {
    initAudioCtx();
    setActiveSounds(prev => {
      const existing = prev.find(s => s.id === soundId);
      if (existing) {
        return prev.filter(s => s.id !== soundId);
      }
      return [...prev, { id: soundId, volume: 0.5 }];
    });
  }, [initAudioCtx]);

  const updateSoundVolume = useCallback((soundId: string, volume: number) => {
    setActiveSounds(prev => prev.map(s => s.id === soundId ? { ...s, volume } : s));
  }, []);

  const toggleGlobal = useCallback(() => {
    initAudioCtx();
    setIsGlobalPlaying(prev => !prev);
  }, [initAudioCtx]);

  const setPreset = useCallback((sounds: ActiveSound[]) => {
    initAudioCtx();
    setActiveSounds(sounds);
    setIsGlobalPlaying(true);
  }, [initAudioCtx]);

  // Handle individual audio elements
  useEffect(() => {
    SOUNDS.forEach(sound => {
      if (!audioRefs.current[sound.id]) {
        const audio = new Audio();
        // CRITICAL: Set crossOrigin BEFORE setting src to ensure CORS headers are handled correctly by the browser
        audio.crossOrigin = "anonymous";
        audio.src = sound.url;
        audio.loop = true;
        audio.preload = "auto";
        audioRefs.current[sound.id] = audio;
      }
    });

    return () => {
      (Object.values(audioRefs.current) as HTMLAudioElement[]).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
      audioRefs.current = {};
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // Sync state to audio elements and wire to Web Audio API
  useEffect(() => {
    if (!audioCtxRef.current || !masterGainRef.current) return;

    masterGainRef.current.gain.value = masterVolume;

    Object.keys(audioRefs.current).forEach(id => {
      const audio = audioRefs.current[id];
      const activeData = activeSounds.find(s => s.id === id);

      // Connect source node if not already connected
      if (!sourceNodesRef.current[id] && audioCtxRef.current) {
        try {
          // Verify audio has a valid source and isn't in an error state
          if (audio.src) {
            const source = audioCtxRef.current.createMediaElementSource(audio);
            source.connect(masterGainRef.current!);
            sourceNodesRef.current[id] = source;
          }
        } catch (e) {
          console.warn("Failed to create media source (likely already connected or blocked by CORS):", e);
        }
      }

      if (activeData && isGlobalPlaying) {
        audio.volume = activeData.volume;
        if (audio.paused) {
          // Wrap in a safe play handler to manage browser autoplay policies
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.error(`Audio playback error for ${id}:`, error.message);
            });
          }
        }
      } else {
        audio.pause();
      }
    });
  }, [activeSounds, masterVolume, isGlobalPlaying]);

  return {
    activeSounds,
    masterVolume,
    setMasterVolume,
    isGlobalPlaying,
    toggleGlobal,
    toggleSound,
    updateSoundVolume,
    setPreset,
    analyser: analyserRef.current,
    stopAll: () => {
      setIsGlobalPlaying(false);
      setActiveSounds([]);
    }
  };
};
