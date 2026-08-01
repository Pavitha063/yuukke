import React from 'react';
import { ArrowRight, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onOpenCategory: (cat: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onOpenCategory }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        {/* Eyebrow */}
        <div className="flex items-center space-x-2 text-xs font-bold tracking-widest text-[#8a1f3d] uppercase mb-4">
          <span>BUY BETTER</span>
          <span className="text-gray-300">•</span>
          <span>LIVE BETTER</span>
          <span className="text-gray-300">•</span>
          <span>BUILD BETTER</span>
        </div>

        {/* Main Headline */}
        <h1 className="headline-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] text-[#1a1a1a] mb-6">
          The world celebrates brands. We celebrate{' '}
          <span className="text-[#8a1f3d] italic underline decoration-[#d9a35e]/40 underline-offset-8">
            builders.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
          Shop products, book services, and choose meaningful gifts created by women entrepreneurs. Every order supports income, market access, and independent futures.
        </p>

        {/* CTAs and quick highlights */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-6 items-start sm:items-center">
          <button
            onClick={onExplore}
            className="bg-[#8a1f3d] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#721831] shadow-md hover:shadow-lg transition-all flex items-center gap-2 group cursor-pointer"
          >
            Explore Marketplace
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#d9a35e]" />
          </button>

          <div className="flex space-x-6 text-sm border-l border-gray-200 pl-6 py-1">
            <button
              onClick={() => onOpenCategory('products')}
              className="text-left group cursor-pointer"
            >
              <p className="font-bold text-[#1a1a1a] group-hover:text-[#8a1f3d] transition-colors">Products</p>
              <p className="text-xs text-gray-500">From women-led brands</p>
            </button>
            <button
              onClick={() => onOpenCategory('services')}
              className="text-left group cursor-pointer"
            >
              <p className="font-bold text-[#1a1a1a] group-hover:text-[#8a1f3d] transition-colors">Services</p>
              <p className="text-xs text-gray-500">From women experts</p>
            </button>
          </div>
        </div>

        {/* Social Proof Pills */}
        <div className="mt-10 pt-6 border-t border-gray-200/80 flex items-center gap-6 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#8a1f3d]" />
            <span>100% Women-Owned Enterprises</span>
          </div>
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-[#d9a35e]" />
            <span>Direct Income Empowerment</span>
          </div>
        </div>
      </div>

      {/* Right Column - Hero Visual */}
      <div className="relative">
        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100">
          <img
            src="https://lh3.googleusercontent.com/aida/AP1WRLv_WCMazG5UfJEvYSQCg_CDiphIYPlIyW8i-FlvmHYzRxyK7rwdjtPWJS3sYa73t1YecTw1DqbOy1tfSX_ydRjG0oixbol-2VvAzfLQipPyqVWotxph-RsLFl8RZb1L_u7ucmA1OxKvEZOISA6UOXTGV3RRnmH9WO26Ldof2SeFjc9PyRvQ1bBfKjppfWPg2yES0t2zsOizMajZkQiV1RqRLimIddZ-Zp5-6V2OZLgiC9S-0Vb_6NFy"
            alt="Women entrepreneurs collaborating"
            className="w-full h-[380px] sm:h-[480px] object-cover object-center transform hover:scale-102 transition-transform duration-700"
          />
        </div>

        {/* Floating Impact Badge */}
        <div className="absolute -bottom-6 -left-4 sm:-bottom-6 sm:-left-6 bg-white p-5 sm:p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs">
          <div className="flex items-center space-x-2.5 mb-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-700">
              TALENT INTO INDEPENDENCE
            </span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
            Shop, Connect, Grow — all in one platform for woman builders.
          </p>
        </div>
      </div>
    </section>
  );
};
