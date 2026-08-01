import React, { useState } from 'react';
import { ODOP_DISTRICTS } from '../data/mockData';
import { MapPin, CheckCircle2, Users, Award } from 'lucide-react';

export const GroundImpact: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(0);
  const currentDistrict = ODOP_DISTRICTS[selectedDistrict];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="bg-[#8a1f3d] rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden text-white shadow-2xl flex flex-col lg:flex-row items-stretch">
        {/* Left Column Content */}
        <div className="p-8 sm:p-12 md:p-16 flex-1 flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold tracking-widest text-amber-200 uppercase mb-3 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              PROVEN ON THE GROUND — ODOP UTTAR PRADESH
            </p>

            <h2 className="headline-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
              Not a pitch — a movement already in motion.
            </h2>

            <p className="text-gray-100 mb-10 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              In partnership with ODOP (One District One Product) Uttar Pradesh, Yuukke ran four-day enablement workshops across Varanasi, Lucknow, and Kanpur — empowering women in Banarasi silk, Zardozi, and leather craft to turn traditional skills into market-ready, digitally enabled businesses.
            </p>

            {/* Interactive District Tabs */}
            <div className="mb-8 bg-black/20 p-2 rounded-xl backdrop-blur-xs flex flex-wrap gap-2">
              {ODOP_DISTRICTS.map((dist, idx) => (
                <button
                  key={dist.name}
                  onClick={() => setSelectedDistrict(idx)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedDistrict === idx
                      ? 'bg-white text-[#8a1f3d] shadow-md'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  📍 {dist.name} District
                </button>
              ))}
            </div>

            {/* Selected District Highlights */}
            <div className="bg-white/10 border border-white/20 p-4 rounded-xl mb-10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
                  Focus Craft: {currentDistrict.craft}
                </span>
                <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-semibold">
                  {currentDistrict.artisans}+ Artisans
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-200 pt-2 border-t border-white/10">
                {currentDistrict.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 border-t border-white/20 pt-8">
            <div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-1 font-serif">
                710+
              </div>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-200">
                WOMEN ARTISANS TRAINED
              </p>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-1 font-serif">
                3
              </div>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-200">
                DISTRICTS REACHED
              </p>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-1 font-serif">
                200+
              </div>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-200">
                ENTREPRENEURS ONBOARDED
              </p>
            </div>
          </div>
        </div>

        {/* Right Column Image */}
        <div className="lg:w-2/5 min-h-[320px] lg:min-h-full relative overflow-hidden bg-black/20">
          <img
            src="https://lh3.googleusercontent.com/aida/AP1WRLtQIVKgDiuIvVkML6mG4vQb01YeM1vkY7Pj4giICWYdBp2JOMwLZXYBjMUA2ag3lazcMy89fBAtrpuT7W9IFhV6lzrkexdu20FQMVKvuGL-eVinAeV-1Ee_abYiue2Wnolm7h4t3ErGd8-_MgYpkVMY5polskSPiXf0a-qZdK1qg1N1Pwk07PU5rXec5Yidg3lhUWjQhw61CS6Weh0EwU4waMLOGNb-YPca3lf-iH3vPpIHfU_ujVAb"
            alt="Artisans training workshop"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-l" />
          <div className="absolute bottom-6 left-6 right-6 text-white text-xs bg-black/40 backdrop-blur-md p-3 rounded-lg border border-white/20">
            <p className="font-semibold">{currentDistrict.name} Enablement Cohort</p>
            <p className="text-[11px] text-gray-300">Yuukke Academy × ODOP UP Certification</p>
          </div>
        </div>
      </div>
    </section>
  );
};
