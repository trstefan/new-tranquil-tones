import { Zap, Moon, Mountain } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/Footer";
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FloatingIcons from "@/components/FloatingIcons";

export default function Home() {
  return (
    <div className="min-h-screen w-full relative flex flex-col bg-stone-950 selection:bg-moss-500/30 ">
      <Navbar />
      <Background />

      <main className="relative z-10 w-full max-w-350 mx-auto px-6 md:px-8 pt-8 md:pt-48 pb-16">
        <HeroSection />

        {/* Feature Cards Showcase */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-24 md:mb-40">
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

        <FloatingIcons />
      </main>
      <Footer />
    </div>
  );
}
