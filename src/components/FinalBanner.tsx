import React from 'react';

interface FinalBannerProps {
  onJoinSeller: () => void;
  onBecomeMentor: () => void;
}

export const FinalBanner: React.FC<FinalBannerProps> = ({ onJoinSeller, onBecomeMentor }) => {
  return (
    <section className="bg-[#8a1f3d] py-20 sm:py-28 overflow-hidden relative">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
        <span className="text-[22vw] font-serif font-black text-white uppercase tracking-tighter whitespace-nowrap">
          BUILDERS
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10 text-white">
        <h2 className="headline-serif text-3xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Join the movement that helps builders become{' '}
          <span className="italic underline underline-offset-8 decoration-amber-300">
            independent.
          </span>
        </h2>

        <p className="text-base sm:text-xl mb-10 text-gray-100 max-w-2xl mx-auto font-normal leading-relaxed">
          Buy. Mentor. Learn. Fund. Refer. Hire. Or simply spread the word. Build futures together.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={onJoinSeller}
            className="bg-[#1a1a1a] text-white px-8 sm:px-10 py-4 rounded-full font-bold text-sm hover:bg-black transition-all shadow-lg hover:shadow-xl cursor-pointer"
          >
            Join as a Seller
          </button>
          <button
            onClick={onBecomeMentor}
            className="bg-white text-[#8a1f3d] px-8 sm:px-10 py-4 rounded-full font-bold text-sm hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl cursor-pointer"
          >
            Become a Mentor
          </button>
        </div>
      </div>
    </section>
  );
};
