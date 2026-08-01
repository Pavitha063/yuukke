import React from 'react';
import { ArrowRight, Sparkles, ShoppingBag, Rocket } from 'lucide-react';

interface TwoRolesMovementProps {
  onOpenBuilderModal: () => void;
  onOpenMarketplaceModal: () => void;
}

export const TwoRolesMovement: React.FC<TwoRolesMovementProps> = ({
  onOpenBuilderModal,
  onOpenMarketplaceModal,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="headline-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a]">
          Two roles. One movement.
        </h2>
        <p className="text-gray-600 mt-3 text-sm sm:text-base">
          One site, two ways to belong. Both build independence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: The Builder */}
        <div className="bg-[#8a1f3d] text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all group">
          <div className="absolute top-0 right-0 p-6 sm:p-8 text-white/10 text-8xl sm:text-9xl font-serif font-black select-none pointer-events-none">
            B
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-amber-200 mb-6">
              <Rocket className="w-3 h-3 text-amber-300" />
              THE BUILDER
            </div>

            <h3 className="headline-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4">
              "I am a builder."<br />
              <span className="italic text-amber-200">Turn talent into independence.</span>
            </h3>

            <p className="text-gray-100 text-sm sm:text-base mb-8 max-w-md leading-relaxed">
              A maker, creator, artisan, or entrepreneur building a business on her own terms with a community of experts rooting for her.
            </p>
          </div>

          <div className="relative z-10 pt-4">
            <button
              onClick={onOpenBuilderModal}
              className="bg-white text-[#8a1f3d] px-8 py-3.5 rounded-full font-bold text-sm hover:bg-gray-100 transition-all flex items-center gap-2 cursor-pointer shadow-md group-hover:gap-3"
            >
              Become a builder
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 2: The Backer */}
        <div className="bg-[#1a1a1a] text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all group">
          <div className="absolute top-0 right-0 p-6 sm:p-8 text-white/10 text-8xl sm:text-9xl font-serif font-black select-none pointer-events-none">
            B
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-300 mb-6">
              <ShoppingBag className="w-3 h-3 text-emerald-400" />
              THE BACKER
            </div>

            <h3 className="headline-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4">
              "I back builders."<br />
              <span className="italic text-gray-300">Discover &amp; support them.</span>
            </h3>

            <p className="text-gray-300 text-sm sm:text-base mb-8 max-w-md leading-relaxed">
              Be among the first to discover remarkable products and the stories behind the screen. Every purchase builds a business.
            </p>
          </div>

          <div className="relative z-10 pt-4">
            <button
              onClick={onOpenMarketplaceModal}
              className="bg-[#8a1f3d] text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-[#721831] transition-all flex items-center gap-2 cursor-pointer shadow-md group-hover:gap-3"
            >
              Explore Marketplace
              <ArrowRight className="w-4 h-4 text-[#d9a35e]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
