import React, { useState } from 'react';
import { PRESS_FEATURED } from '../data/mockData';

export const TrustBar: React.FC = () => {
  const [activePress, setActivePress] = useState<string | null>(null);

  const pressQuotes: Record<string, string> = {
    'The Hindu': '"Yuukke is transforming grassroot women artisans into global brand owners with tech and market access."',
    'D&B': '"A verified Dun & Bradstreet ecosystem building supply-chain transparency for women entrepreneurs."',
    'The Times of India': '"From Uttar Pradesh silk weavers to digital service providers, Yuukke bridges identity to income."',
    'Entrepreneur': '"The all-in-one impact platform democratizing commerce and mentorship for female builders."'
  };

  return (
    <section className="border-y border-gray-200/60 py-8 bg-white/60 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-[10px] uppercase tracking-widest font-extrabold text-gray-400 mb-5">
          AS FEATURED IN
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-14 md:gap-20">
          {PRESS_FEATURED.map((item) => (
            <button
              key={item.name}
              onClick={() => setActivePress(activePress === item.name ? null : item.name)}
              className={`transition-all duration-300 cursor-pointer ${
                activePress === item.name
                  ? 'text-[#8a1f3d] scale-105'
                  : 'text-gray-400 hover:text-gray-700 hover:scale-102'
              }`}
            >
              <span className={item.style}>{item.name}</span>
            </button>
          ))}
        </div>

        {activePress && (
          <div className="mt-4 max-w-xl mx-auto bg-[#8a1f3d]/5 border border-[#8a1f3d]/20 p-3 rounded-lg text-xs text-[#8a1f3d] font-medium animate-fadeIn">
            {pressQuotes[activePress]}
          </div>
        )}
      </div>
    </section>
  );
};
