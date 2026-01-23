import React from 'react'
import { ShieldCheck, EyeOff, Infinity, Sparkles } from 'lucide-react'

const SubHero = () => {
  return (
       <section className="mb-64 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-32 bg-gradient-to-b from-moss-500/40 to-transparent"></div>
          
          <div className="max-w-4xl mx-auto text-center pt-48">
            <h2 className="text-4xl md:text-6xl font-serif italic text-moss-100 mb-12 leading-tight">
              No algorithms. <br />
              <span className="text-moss-500 not-italic">Just nature vibes.</span>
            </h2>
            
            <p className="text-moss-400 text-xl font-light leading-relaxed mb-16 max-w-2xl mx-auto">
              Tranquil Tones doesn't fight for your attention. No tracking. No engagement hacks. Just the pure resonance of the wild, tuned for focus.
            </p>

            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-60">
              <PrincipleItem icon={ShieldCheck} text="Privacy First" />
              <PrincipleItem icon={EyeOff} text="Zero Tracking" />
              <PrincipleItem icon={Infinity} text="Endless Flow" />
              <PrincipleItem icon={Sparkles} text="Pure Sound" />
            </div>
          </div>
        </section>
  )
}

export default SubHero


const PrincipleItem = ({ icon: Icon, text }: { icon: any, text: string }) => (
  <div className="flex items-center gap-4 text-moss-400">
    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
      <Icon className="w-4 h-4" />
    </div>
    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{text}</span>
  </div>
);
