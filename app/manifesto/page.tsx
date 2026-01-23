
import { ArrowLeft, Leaf, Sparkles, Wind, Heart} from 'lucide-react'
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Manifesto | Tranquil Tones",
    
};

export default function Manifesto() {
    return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-stone-950 selection:bg-moss-500/30">
      {/* Grain Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Atmospheric Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-moss-500/10 blur-[160px] rounded-full animate-breath" style={{ '--breath-duration': '20s' } as any}></div>
      </div>

      <nav className="relative z-50 px-10 py-12 flex justify-between items-center max-w-[1400px] mx-auto w-full">
        <Link href="/"  className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-moss-200 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-700">
            <Leaf className="text-stone-950 w-5 h-5" />
          </div>
          <span className="font-outfit font-light tracking-[0.2em] text-sm uppercase text-moss-200">Tranquil Tones</span>
        </Link>
        <Link href="/" 
          
          className="group text-xs font-outfit tracking-widest uppercase text-moss-400 hover:text-moss-100 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back Home
        </Link>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto px-10 py-20 text-center">
        <div className="mb-12 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-moss-400 text-[10px] uppercase tracking-[0.4em] font-bold animate-fade-in">
          <Sparkles className="w-3 h-3" /> The Manifesto
        </div>

        <h1 className="text-6xl md:text-9xl font-serif italic text-moss-100 leading-[0.85] mb-20 animate-slide-up">
          Reclaiming the <br />
          <span className="text-moss-500 not-italic">Sanctuary of Mind.</span>
        </h1>

        <div className="space-y-16 animate-slide-up [animation-delay:300ms]">
          <p className="text-2xl md:text-4xl text-moss-200 font-light leading-relaxed max-w-4xl">
            In an era of relentless notification and digital chaos, <span className="text-white italic">silence</span> is no longer a luxury—it is a necessity for the soul.
          </p>

          <div className="grid md:grid-cols-2 gap-12 text-left">
            <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm">
              <h3 className="font-serif italic text-2xl text-moss-400 mb-4">Our Mission</h3>
              <p className="text-moss-300 font-light leading-relaxed">
                To build tools that don't demand your attention, but rather help you hold it. We believe software should feel like a landscape—ever-present, calming, and responsive to your inner state.
              </p>
            </div>
            <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm">
              <h3 className="font-serif italic text-2xl text-moss-400 mb-4">Our Philosophy</h3>
              <p className="text-moss-300 font-light leading-relaxed">
                No algorithms. No engagement loops. No distractions. Just organic textures and high-fidelity recordings that allow you to compose your own quietude.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-32 opacity-20 flex gap-12 animate-fade-in">
          <Wind className="w-6 h-6" />
          <Heart className="w-6 h-6" />
          <Leaf className="w-6 h-6" />
        </div>
      </main>

      <footer className="relative z-10 py-16 text-center">
        <Link href="/sanctuary" 
          
          className="group relative inline-flex items-center gap-4 bg-moss-200 text-stone-950 px-10 py-4 rounded-full font-medium hover:bg-white transition-all duration-500"
        >
          Go to the Sanctuary
        </Link>
      </footer>
    </div>
  );
}