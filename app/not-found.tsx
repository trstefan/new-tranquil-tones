
import React from 'react';
import { Compass, ArrowLeft, Leaf, Wind } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center bg-stone-950 selection:bg-moss-500/30">
      {/* Grain Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Atmospheric Background - Reusing the breathing logic conceptually */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-moss-500/5 blur-[120px] rounded-full animate-breath" style={{ '--breath-duration': '15s', '--breath-opacity-min': 0.05, '--breath-opacity-max': 0.15 } as any}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-blue-500/5 blur-[120px] rounded-full animate-breath" style={{ animationDelay: '-5s', '--breath-duration': '20s', '--breath-opacity-min': 0.03, '--breath-opacity-max': 0.1 } as any}></div>
      </div>

      <main className="relative z-10 text-center px-8">
        <div className="mb-12 inline-flex items-center justify-center w-24 h-24  animate-float">
          <Leaf className="w-10 h-10 text-moss-400 opacity-40" />
        </div>

        <p className="text-moss-400 font-outfit text-xs tracking-[0.4em] uppercase mb-8 animate-slide-up">
          Error 404
        </p>
        
        <h1 className="text-6xl md:text-8xl font-serif italic text-moss-100 leading-[0.9] mb-12 animate-slide-up [animation-delay:200ms]">
          Lost in <br />
          <span className="text-moss-500 not-italic">the mist.</span>
        </h1>

        <div className="max-w-md mx-auto animate-slide-up [animation-delay:400ms]">
          <p className="text-moss-300 font-light text-xl leading-relaxed mb-12">
            This path led nowhere. The stillness you seek is back at the sanctuary.
          </p>

          <button 
            className="group relative inline-flex items-center gap-4 bg-moss-200 text-stone-950 px-10 py-4 rounded-full font-medium hover:bg-white hover:scale-105 transition-all duration-500 shadow-2xl shadow-moss-900/40"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Return to Sanctuary
          </button>
        </div>
      </main>
    </div>
  )
}

export default NotFound