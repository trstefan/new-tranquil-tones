import React from 'react';
import Link from 'next/link';
import { Sun } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="text-center mb-24 md:mb-40">
      <p className="text-moss-400 font-outfit text-[10px] md:text-xs tracking-[0.4em] uppercase mb-6 md:mb-8 animate-slide-up">
        A breath of fresh air for your mind
      </p>

      <h1 className="text-5xl sm:text-7xl md:text-[9rem] font-serif italic text-moss-100 leading-[0.9] md:leading-[0.85] mb-8 md:mb-12 animate-slide-up [animation-delay:200ms]">
        Find your <br />
        <span className="text-moss-500 not-italic">stillness.</span>
      </h1>

      <div className="max-w-xl mx-auto animate-slide-up [animation-delay:400ms] px-4">
        <p className="text-moss-300 font-light text-lg md:text-xl leading-relaxed mb-10 md:mb-12">
          Escape the digital noise. Layer the organic textures of the earth
          to create a workspace that feels like a hidden forest.
        </p>

        <Link 
          href="/sanctuary" 
          className="group relative inline-flex items-center gap-3 md:gap-4 bg-moss-200 text-stone-950 px-8 py-4 md:px-12 md:py-5 rounded-full font-medium text-base md:text-lg hover:bg-white hover:scale-105 transition-all duration-500 shadow-2xl shadow-moss-900/40 hover:cursor-pointer"
        >
          Start Session
          <Sun
            className="w-4 h-4 md:w-5 md:h-5 animate-spin-slow"
            style={{ animationDuration: "10s" }}
          />
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
