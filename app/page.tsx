import Image from "next/image";
import {
  CloudRain,
  ArrowRight,
  Wind,
  Leaf,
  Droplets,
  Sparkles,
  Sun,
  Moon,
  Zap,
  Mountain,
} from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/Footer";
import Link from "next/link";


export default function Home() {
  return (
    <div className="h-screen w-full relative flex flex-col bg-stone-950 selection:bg-moss-500/30">
      {/* Organic Mist/Fog Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-moss-500/10 blur-[120px] rounded-full animate-mist-drift"></div>
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-500/5 blur-[120px] rounded-full "
          style={{ animationDelay: "-5s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[80vh] bg-linear-to-b from-transparent via-moss-500/10 to-transparent"></div>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 px-10 py-12 flex justify-between items-center max-w-350 mx-auto animate-fade-in w-full">
        <div className="flex items-center gap-3">
          <Leaf className="w-5 h-5 text-moss-400" />
          <span className="font-outfit font-light tracking-[0.2em] text-sm uppercase text-moss-200">
            Tranquil Tones
          </span>
        </div>
        <Link href="/sanctuary" className="group text-xs font-outfit tracking-widest uppercase text-moss-400 hover:text-moss-100 transition-colors flex items-center gap-2 hover:cursor-pointer ">
          Enter Sanctuary{" "}
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </nav>

      <main className="relative z-10 w-full max-w-350 mx-auto px-8 pt-48 pb-16">
        {/* Hero Section */}
        <section className="text-center mb-40">
          <p className="text-moss-400 font-outfit text-xs tracking-[0.4em] uppercase mb-8 animate-slide-up">
            A breath of fresh air for your mind
          </p>

          <h1 className="text-7xl md:text-[9rem] font-serif italic text-moss-100 leading-[0.85] mb-12 animate-slide-up [animation-delay:200ms]">
            Find your <br />
            <span className="text-moss-500 not-italic">stillness.</span>
          </h1>

          <div className="max-w-xl mx-auto animate-slide-up [animation-delay:400ms]">
            <p className="text-moss-300 font-light text-xl leading-relaxed mb-12">
              Escape the digital noise. Layer the organic textures of the earth
              to create a workspace that feels like a hidden forest.
            </p>

            <Link href="/sanctuary" className="group relative inline-flex items-center gap-4 bg-moss-200 text-stone-950 px-12 py-5 rounded-full font-medium text-lg hover:bg-white hover:scale-105 transition-all duration-500 shadow-2xl shadow-moss-900/40 hover:cursor-pointer">
              Start Session
              <Sun
                className="w-5 h-5 animate-spin-slow"
                style={{ animationDuration: "10s" }}
              />
            </Link>
          </div>
        </section>

        {/* Feature Cards Showcase */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          <FeatureCard
            icon={Mountain}
            title="Sonic Landscapes"
            description="Experience high-fidelity field recordings captured in the world's most remote sanctuaries. From misty valleys to sun-drenched coastlines."
            delay="[animation-delay:600ms]"
          />
          <FeatureCard
            icon={Zap}
            title="Focused Resonances"
            description="Scientifically tuned white, pink, and brown noise layers designed to anchor your mind and shield you from daily distractions."
            delay="[animation-delay:750ms]"
          />
          <FeatureCard
            icon={Moon}
            title="Nocturnal Drift"
            description="Intelligent sleep timers with organic volume fades. A gentle transition from the day's activity into a deep, restorative rest."
            delay="[animation-delay:900ms]"
          />
        </section>

        {/* Floating Icons Decor */}
        <div className="flex justify-center gap-24 opacity-20 animate-fade-in [animation-delay:1200ms]">
          <Wind
            className="w-6 h-6 animate-float"
            style={{ animationDelay: "0s" }}
          />
          <Droplets
            className="w-6 h-6 animate-float"
            style={{ animationDelay: "1s" }}
          />
          <Sparkles
            className="w-6 h-6 animate-float"
            style={{ animationDelay: "2s" }}
          />
          <CloudRain
            className="hidden md:block w-6 h-6 animate-float"
            style={{ animationDelay: "3s" }}
          />
        </div>
      </main>
      <Footer />
      </div>
  );
}
