import React from 'react';
import { Wind, Droplets, Sparkles, CloudRain } from 'lucide-react';

const FloatingIcons = () => {
  return (
    <div className="flex justify-center gap-12 md:gap-24 opacity-20 animate-fade-in [animation-delay:1200ms]">
      <Wind
        className="w-5 h-5 md:w-6 md:h-6 animate-float"
        style={{ animationDelay: "0s" }}
      />
      <Droplets
        className="w-5 h-5 md:w-6 md:h-6 animate-float"
        style={{ animationDelay: "1s" }}
      />
      <Sparkles
        className="w-5 h-5 md:w-6 md:h-6 animate-float"
        style={{ animationDelay: "2s" }}
      />
      <CloudRain
        className="hidden md:block w-6 h-6 animate-float"
        style={{ animationDelay: "3s" }}
      />
    </div>
  );
};

export default FloatingIcons;
