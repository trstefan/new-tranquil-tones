
import React from 'react';
import { X, Mail, Github, Star, Heart, ExternalLink } from 'lucide-react';

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContributeModal = ({ isOpen, onClose }: ContributeModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-950/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-stone-900/90 border border-white/10 rounded-[3.5rem] shadow-3xl overflow-hidden animate-slide-up">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-moss-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 p-8 md:p-10">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-2 rounded-full bg-white/5 text-moss-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <header className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-moss-500/10 border border-moss-500/20 text-moss-300 text-[10px] uppercase tracking-[0.2em] font-bold mb-4">
              <Heart className="w-3 h-3 fill-current" /> Community
            </div>
            <h2 className="text-3xl md:text-4xl font-serif italic text-moss-100">
              Contribute to <span className="text-moss-500 not-italic">Tranquil Tones</span>
            </h2>
          </header>

          <div className="space-y-6">
            <p className="text-moss-300 font-light text-lg leading-relaxed">
              There are lots (and we mean lots!) of relaxing sounds in the world. 
              We'll add as many as we can and we encourage you to contribute too.
            </p>

            <div className="space-y-4">
              <p className="text-moss-500 text-xs uppercase tracking-[0.3em] font-bold">A few ways you can help:</p>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-4 group">
                  <div className="mt-1 w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-moss-400 group-hover:text-moss-200 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-moss-100 font-medium">Send an email directly to <a href="mailto:hello@tranquiltones.app" className="text-moss-400 hover:text-moss-200 underline decoration-moss-500/30 underline-offset-4 transition-all">me</a></p>
                    <p className="text-moss-500 text-sm mt-1">Suggest new field recordings or report a bug.</p>
                  </div>
                </li>

                <li className="flex items-start gap-4 group">
                  <div className="mt-1 w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-moss-400 group-hover:text-moss-200 transition-colors">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-moss-100 font-medium">Contribute code to <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-moss-400 hover:text-moss-200 underline decoration-moss-500/30 underline-offset-4 transition-all inline-flex items-center gap-1">Tranquil Tones <ExternalLink className="w-3 h-3" /></a></p>
                    <p className="text-moss-500 text-sm mt-1">Join our open source sanctuary via GitHub.</p>
                  </div>
                </li>

                <li className="flex items-start gap-4 group">
                  <div className="mt-1 w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-moss-400 group-hover:text-moss-200 transition-colors">
                    <Star className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-moss-100 font-medium">Like this project? <span className="text-moss-400">Give it a star.</span></p>
                    <p className="text-moss-500 text-sm mt-1">Spread the word and help us reach more quiet minds.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/5">
            <button 
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-white/5 text-moss-300 font-medium hover:bg-white/10 hover:text-white transition-all text-sm uppercase tracking-widest"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
