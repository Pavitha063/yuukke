import React from 'react';
import { Sparkles, Globe, Shield, Coins, TrendingUp } from 'lucide-react';

export const ValueProposition: React.FC = () => {
  const pillars = [
    { label: 'Wider markets', icon: Globe },
    { label: 'Tool access', icon: Shield },
    { label: 'Capital connectivity', icon: Coins },
    { label: 'Economic Independence', icon: TrendingUp },
  ];

  return (
    <section className="bg-[#1c1c1c] text-white py-20 md:py-28 relative overflow-hidden">
      {/* Subtle background graphic glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8a1f3d]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <p className="text-xs font-bold tracking-[0.2em] text-[#8a1f3d] uppercase mb-6 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#d9a35e]" />
          WHAT WE BELIEVE
          <Sparkles className="w-3.5 h-3.5 text-[#d9a35e]" />
        </p>

        <h2 className="headline-serif text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-bold leading-tight mb-10 text-gray-100">
          Talent is everywhere.{' '}
          <span className="italic text-[#d9a35e] font-serif block sm:inline">
            Opportunity isn't.
          </span>
          <br className="hidden sm:inline" />
          We refuse to let good work stay{' '}
          <span className="text-[#8a1f3d] underline decoration-2 underline-offset-8">
            invisible.
          </span>
        </h2>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs sm:text-sm font-medium text-gray-300 pt-4 border-t border-white/10">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-colors">
                <div className="w-2 h-2 rounded-full bg-[#8a1f3d]"></div>
                <Icon className="w-4 h-4 text-[#d9a35e]" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
