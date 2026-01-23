import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-8 p-8 ">
      <p className="text-[10px] text-moss-600 uppercase tracking-[0.4em]">
        {new Date().getFullYear()} &copy; Tranquil Tones
      </p>
      <div className="flex gap-8 text-[10px] text-moss-600 uppercase tracking-[0.2em] font-medium">
        <Link href="https://github.com/trstefan/new-tranquil-tones" className="hover:text-moss-300 cursor-pointer transition-colors">
          Github
        </Link>
        <Link href="/manifesto" className="hover:text-moss-300 cursor-pointer transition-colors">
          Manifesto
        </Link>
        <Link href="/privacy" className="hover:text-moss-300 cursor-pointer transition-colors">
          Privacy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
