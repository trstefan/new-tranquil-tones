import React from "react";
import Link from "next/link";
import { Leaf, ArrowRight } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="md:fixed top-0 left-0 right-0 z-50 py-8 md:px-10 md:py-12 flex flex-col gap-4 md:flex-row justify-between items-center max-w-350 mx-auto animate-fade-in w-full">
      <div className="flex items-center gap-3">
        <Leaf className="w-4 h-4 md:w-5 md:h-5 text-moss-400" />
        <span className="font-outfit font-light tracking-[0.2em] text-[10px] md:text-sm uppercase text-moss-200">
          Tranquil Tones
        </span>
      </div>
      <Link
        href="/sanctuary"
        className="group text-[9px] md:text-xs font-outfit tracking-widest uppercase text-moss-400 hover:text-moss-100 transition-colors flex items-center gap-2 hover:cursor-pointer "
      >
        Enter Sanctuary{" "}
        <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 group-hover:translate-x-1 transition-transform" />
      </Link>
    </nav>
  );
};

export default Navbar;
