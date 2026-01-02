
import React from 'react';
import { 
  CloudRain, 
  Waves, 
  Wind, 
  Flame, 
  Bird, 
  Trees, 
  Coffee, 
  Volume2, 
  Zap, 
  Moon, 
  Sparkles,
  Mountain
} from 'lucide-react';
import { Sound, Preset } from './types';

// Updated URLs to more stable sources that support direct streaming and CORS
export const SOUNDS: Sound[] = [
  { id: 'rain', name: 'Gentle Rain', type: 'nature', icon: 'CloudRain', url: 'https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg' },
  { id: 'waves', name: 'Ocean Waves', type: 'nature', icon: 'Waves', url: 'https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg' },
  { id: 'cafe', name: 'Cozy Cafe', type: 'ambient', icon: 'Coffee', url: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg' },
];

export const PRESETS: Preset[] = [
  {
    id: 'focus',
    name: 'Deep Focus',
    description: 'Perfect for concentration and flow.',
    sounds: [
      { id: 'brown-noise', volume: 0.6 },
      { id: 'leaves', volume: 0.3 }
    ]
  },
  {
    id: 'rainy',
    name: 'Rainy Shelter',
    description: 'The comfort of rain on a roof.',
    sounds: [
      { id: 'rain', volume: 0.8 },
      { id: 'fire', volume: 0.4 }
    ]
  },
  {
    id: 'zen',
    name: 'Zen Garden',
    description: 'Calm birds and gentle wind.',
    sounds: [
      { id: 'birds', volume: 0.5 },
      { id: 'wind', volume: 0.4 }
    ]
  },
  {
    id: 'sleep',
    name: 'Ocean Sleep',
    description: 'Drift away with the waves.',
    sounds: [
      { id: 'waves', volume: 0.7 },
      { id: 'deep-space', volume: 0.2 }
    ]
  }
];

export const getIcon = (iconName: string, className?: string) => {
  switch (iconName) {
    case 'CloudRain': return <CloudRain className={className} />;
    case 'Waves': return <Waves className={className} />;
    case 'Wind': return <Wind className={className} />;
    case 'Flame': return <Flame className={className} />;
    case 'Bird': return <Bird className={className} />;
    case 'Trees': return <Trees className={className} />;
    case 'Coffee': return <Coffee className={className} />;
    case 'Volume2': return <Volume2 className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'Mountain': return <Mountain className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Moon': return <Moon className={className} />;
    default: return <Volume2 className={className} />;
  }
};
