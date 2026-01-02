
import React, { useEffect, useRef } from 'react';

interface VisualizerProps {
  analyser: AnalyserNode | null;
  isActive: boolean;
  className?: string;
  color?: string;
  type?: 'wave' | 'mist';
}

export const Visualizer = ({ 
  analyser, 
  isActive, 
  className = "", 
  color = "#8cae9e",
  type = 'wave'
} : VisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(null);

  useEffect(() => {
    if (!canvasRef.current || !analyser) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animationRef.current = requestAnimationFrame(render);
      
      if (type === 'wave') {
        analyser.getByteTimeDomainData(dataArray);
      } else {
        analyser.getByteFrequencyData(dataArray);
      }

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      if (!isActive) return;

      if (type === 'wave') {
        // Organic Single Wave (for footer)
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
        ctx.lineCap = 'round';

        const sliceWidth = width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * height) / 2;
          if (i === 0) ctx.moveTo(x, y);
          else {
            const cpX = x + sliceWidth / 2;
            ctx.quadraticCurveTo(x, y, cpX, y);
          }
          x += sliceWidth;
        }
        ctx.stroke();
      } else {
        // Ambient Layered Mist (for background)
        const layers = 3;
        for (let l = 0; l < layers; l++) {
          ctx.beginPath();
          ctx.fillStyle = `${color}${l === 0 ? '11' : '08'}`; // Very low opacity
          
          const sliceWidth = width / (bufferLength / 2);
          let x = 0;
          ctx.moveTo(0, height);

          for (let i = 0; i < bufferLength / 2; i++) {
            // Use frequency data to modulate height
            const barHeight = (dataArray[i] / 255) * (height * (0.4 + l * 0.2));
            const y = height - barHeight - (l * 20);
            
            if (i === 0) ctx.lineTo(x, y);
            else {
              const cpX = x + sliceWidth / 2;
              ctx.quadraticCurveTo(x, y, cpX, y);
            }
            x += sliceWidth;
          }

          ctx.lineTo(width, height);
          ctx.closePath();
          ctx.fill();
        }
      }
    };

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [analyser, isActive, color, type]);

  return (
    <canvas 
      ref={canvasRef} 
      width={1200} 
      height={300} 
      className={`w-full h-full transition-opacity duration-2000 ${isActive ? 'opacity-100' : 'opacity-0'} ${className}`}
    />
  );
};
