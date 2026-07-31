import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { CategoryItem } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ShopByNeedProps {
  onSelectCategory: (category: CategoryItem) => void;
}

export const ShopByNeed: React.FC<ShopByNeedProps> = ({ onSelectCategory }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-12 sm:mb-16">
        <p className="text-xs font-bold tracking-widest text-[#8a1f3d] uppercase mb-2">
          SHOP BY NEED
        </p>
        <h2 className="headline-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a]">
          Find what you came for faster.
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Start with the buying journey: meaningful gifts, products, services, or workshops — all powered by women builders.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat)}
            className="group cursor-pointer flex flex-col bg-white rounded-2xl p-2.5 sm:p-3 border border-gray-100 hover:border-[#8a1f3d]/30 hover:shadow-xl transition-all duration-300"
          >
            <div className="aspect-3/4 rounded-xl overflow-hidden mb-3 relative bg-gray-100">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-white text-[11px] font-semibold flex items-center gap-1">
                  Browse {cat.title} <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
              {cat.itemCount && (
                <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  {cat.itemCount}+
                </span>
              )}
            </div>

            <div className="px-1 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#1a1a1a] group-hover:text-[#8a1f3d] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-snug">
                  {cat.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
