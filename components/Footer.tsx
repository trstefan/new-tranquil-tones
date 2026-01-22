import React from "react";

const Footer = () => {
  return (
    <footer className="w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-8 p-8 ">
      <p className="text-[10px] text-moss-600 uppercase tracking-[0.4em]">
        Designed for Quiet Minds
      </p>
      <div className="flex gap-8 text-[10px] text-moss-600 uppercase tracking-[0.2em] font-medium">
        <span className="hover:text-moss-300 cursor-pointer transition-colors">
          Principles
        </span>
        <span className="hover:text-moss-300 cursor-pointer transition-colors">
          Manifesto
        </span>
        <span className="hover:text-moss-300 cursor-pointer transition-colors">
          Privacy
        </span>
      </div>
    </footer>
  );
};

export default Footer;
