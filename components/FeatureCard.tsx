import React from "react";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: any;
  title: string;
  description: string;
  delay: string;
}) => (
  <div
    className={`group relative p-6 md:p-8 rounded-t-[3rem] md:rounded-t-[4rem] rounded-b-[2rem] md:rounded-b-[2.5rem] bg-white/2 border border-white/5 backdrop-blur-3xl transition-all duration-700 hover:bg-white/5 hover:border-moss-500/20 hover:-translate-y-2 animate-slide-up ${delay}`}
  >
    <div className="absolute inset-0 bg-linear-to-br from-moss-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[inherit]"></div>

    <div className="relative z-10">
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-stone-900/50 flex items-center justify-center mb-6 md:mb-8 border border-white/5 group-hover:scale-110 group-hover:border-moss-500/30 transition-all duration-700">
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-moss-400 group-hover:text-moss-200 transition-colors" />
      </div>

      <h3 className="font-serif italic text-2xl md:text-3xl text-moss-100 mb-3 md:mb-4">{title}</h3>
      <p className="text-moss-400 font-light text-xs md:text-sm leading-relaxed tracking-wide">
        {description}
      </p>
    </div>

    {/* Subtle Dappled Light Glow */}
    <div className="absolute -top-4 -right-4 w-24 h-24 bg-moss-400/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
  </div>
);

export default FeatureCard;
