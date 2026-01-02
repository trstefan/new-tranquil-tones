
export type SoundType = 'nature' | 'noise' | 'ambient';

export interface Sound {
  id: string;
  name: string;
  type: SoundType;
  icon: string;
  url: string;
}

export interface ActiveSound {
  id: string;
  volume: number;
}

export interface Preset {
  id: string;
  name: string;
  description: string;
  sounds: ActiveSound[];
}

export type TimerMode = 'focus' | 'relax' | 'sleep';

export interface TimerState {
  isActive: boolean;
  timeLeft: number; // in seconds
  totalTime: number;
  mode: TimerMode;
}
