import React from "react";
import { X, Mail, Github, Star, Heart, ExternalLink } from "lucide-react";

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContributeModal = ({ isOpen, onClose }: ContributeModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg md:max-w-2xl bg-stone-900/90 border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] shadow-3xl overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-moss-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />

        <div className="relative z-10 p-6 md:p-10 overflow-y-auto custom-scrollbar">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 md:top-8 md:right-8 p-2 rounded-full bg-white/5 text-moss-500 hover:text-white transition-colors z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <header className="mb-6 pr-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-moss-500/10 border border-moss-500/20 text-moss-300 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold mb-4">
              <Heart className="w-3 h-3 fill-current" /> Community
            </div>
            <h2
              id="modal-title"
              className="text-2xl md:text-4xl font-serif italic text-moss-100 leading-tight"
            >
              Contribute to <br className="sm:hidden" />
              <span className="text-moss-500 not-italic">Tranquil Tones</span>
            </h2>
          </header>

          <div className="space-y-6 md:space-y-8">
            <p className="text-moss-300 font-light text-base md:text-lg leading-relaxed">
              There are lots (and we mean lots!) of relaxing sounds in the
              world. We'll add as many as we can and we encourage you to
              contribute too.
            </p>

            <div className="space-y-4 md:space-y-6">
              <p className="text-moss-500 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold">
                A few ways you can help:
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-4 group">
                  <div className="mt-1 w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-moss-400 group-hover:text-moss-200 transition-colors shrink-0">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-moss-100 font-medium text-sm md:text-base">
                      Contribute code to{" "}
                      <a
                        href="https://github.com/trstefan/new-tranquil-tones"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-moss-400 hover:text-moss-200 underline decoration-moss-500/30 underline-offset-4 transition-all inline-flex items-center gap-1"
                      >
                        Tranquil Tones <ExternalLink className="w-3 h-3" />
                      </a>
                    </p>
                    <p className="text-moss-500 text-xs md:text-sm mt-1">
                      Join our open source sanctuary via GitHub.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4 group">
                  <div className="mt-1 w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-moss-400 group-hover:text-moss-200 transition-colors shrink-0">
                    <Star className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-moss-100 font-medium text-sm md:text-base">
                      Like this project?{" "}
                      <span className="text-moss-400">Give it a star.</span>
                    </p>
                    <p className="text-moss-500 text-xs md:text-sm mt-1">
                      Spread the word and help us reach more quiet minds.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 md:mt-10 pt-6 border-t border-white/5">
            <button
              onClick={onClose}
              className="w-full py-3 md:py-4 rounded-2xl bg-white/5 text-moss-300 font-medium hover:bg-white/10 hover:text-white transition-all text-xs md:text-sm uppercase tracking-widest"
              aria-label="Close modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
