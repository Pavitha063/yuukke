import React from 'react';
import { PILLARS } from '../data/mockData';
import { UserCheck, GraduationCap, ShoppingBag, Globe, CreditCard } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  UserCheck: <UserCheck className="w-5 h-5 text-[#8a1f3d]" />,
  GraduationCap: <GraduationCap className="w-5 h-5 text-[#8a1f3d]" />,
  ShoppingBag: <ShoppingBag className="w-5 h-5 text-[#8a1f3d]" />,
  Globe: <Globe className="w-5 h-5 text-[#8a1f3d]" />,
  CreditCard: <CreditCard className="w-5 h-5 text-[#8a1f3d]" />,
};

export const EnablementPillars: React.FC = () => {
  return (
    <section id="about-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-white border-b border-gray-100">
      <div className="text-center mb-16">
        <p className="text-xs font-bold tracking-widest text-[#8a1f3d] uppercase mb-2">
          HOW WE BRIDGE IT
        </p>
        <h2 className="headline-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a]">
          From identity to income.
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
          One platform for every women builder, artisan, and expert — Yuukke makes it work.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {PILLARS.map((p) => (
          <div
            key={p.number}
            className="p-6 rounded-2xl bg-[#fdfaf6] border border-gray-100 hover:border-[#8a1f3d]/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#8a1f3d] font-serif font-bold text-xl sm:text-2xl group-hover:scale-110 transition-transform">
                  {p.number}
                </span>
                <div className="p-2.5 bg-white rounded-xl shadow-2xs border border-gray-100">
                  {iconMap[p.iconName]}
                </div>
              </div>
              <h3 className="font-bold text-base text-[#1a1a1a] mb-2 group-hover:text-[#8a1f3d] transition-colors">
                {p.title}
              </h3>
              <p className="text-xs leading-relaxed text-gray-600">
                {p.description}
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-gray-200/60 text-[10px] font-semibold text-[#8a1f3d] uppercase tracking-wider">
              Yuukke Ecosystem
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
