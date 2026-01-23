import { Metadata } from "next";
import { ArrowLeft, Leaf, Lock, Shield } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Tranquil Tones",
};

export default function Privacy() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-stone-950 selection:bg-moss-500/30">
      {/* Grain Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Atmospheric Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-10%] right-[-5%] w-[70%] h-[70%] bg-moss-500/5 blur-[120px] rounded-full animate-breath"
          style={
            {
              "--breath-duration": "18s",
              "--breath-opacity-min": 0.05,
              "--breath-opacity-max": 0.12,
            } as any
          }
        ></div>
      </div>

      <nav className="relative z-50 px-10 py-12 flex justify-between items-center max-w-350 mx-auto w-full">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-moss-200 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-700">
            <Leaf className="text-stone-950 w-5 h-5" />
          </div>
          <span className="font-outfit font-light tracking-[0.2em] text-sm uppercase text-moss-200">
            Tranquil Tones
          </span>
        </Link>
        <Link
          href="/"
          className="group text-xs font-outfit tracking-widest uppercase text-moss-400 hover:text-moss-100 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />{" "}
          Back Home
        </Link>
      </nav>

      <main className="relative z-10 flex-1 max-w-3xl mx-auto px-10 py-20">
        <header className="mb-16">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-moss-400 mb-8">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif italic text-moss-100 mb-6">
            Privacy in{" "}
            <span className="text-moss-500 not-italic">Silence.</span>
          </h1>
          <p className="text-moss-400 font-outfit text-xs tracking-[0.3em] uppercase">
            Last updated: May 2024
          </p>
        </header>

        <div className="space-y-12 text-moss-300 font-light text-lg leading-relaxed">
          <section>
            <h2 className="text-moss-100 font-outfit font-medium text-xl mb-4 flex items-center gap-3">
              <Lock className="w-4 h-4 text-moss-500" /> Radical Transparency
            </h2>
            <p>
              Tranquil Tones is built on the belief that your mental space
              should be private. We do not track you, we do not sell your data,
              and we do not use third-party analytics that compromise your
              anonymity.
            </p>
          </section>

          <section>
            <h2 className="text-moss-100 font-outfit font-medium text-xl mb-4">
              Local Sanctuary
            </h2>
            <p>
              Your custom mixes and presets are stored exclusively in your
              browser's local storage. They never leave your device. We have no
              servers that store your preferences or usage history.
            </p>
          </section>

          <section>
            <h2 className="text-moss-100 font-outfit font-medium text-xl mb-4">
              No Cookies
            </h2>
            <p>
              We don't use tracking cookies. The only data kept is what is
              necessary for the app to function as you've configured it, right
              here, in your own digital environment.
            </p>
          </section>
        </div>
      </main>

      <footer className="relative z-10 py-16 text-center">
        <Link
          href="/"
          className="group relative inline-flex items-center gap-4 bg-moss-200 text-stone-950 px-10 py-4 rounded-full font-medium hover:bg-white transition-all duration-500"
        >
          Return Home
        </Link>
      </footer>
    </div>
  );
}
