import React from 'react';
import { ArrowRight, CheckCircle2, Briefcase, Clock, CreditCard, Video, Sparkles } from 'lucide-react';

interface ServiceHubProps {
  onCreateSpace: () => void;
}

export const ServiceHub: React.FC<ServiceHubProps> = ({ onCreateSpace }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column */}
        <div>
          <p className="text-xs font-bold tracking-widest text-[#8a1f3d] uppercase mb-4 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#d9a35e]" />
            YUUKKE SERVICE HUB
          </p>

          <h2 className="headline-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight text-[#1a1a1a]">
            Run your business <span className="text-[#8a1f3d] italic">without running behind everything.</span>
          </h2>

          <p className="text-gray-600 mb-8 text-sm sm:text-base md:text-lg leading-relaxed">
            Bookings on WhatsApp, Payments through screenshots, Zoom links sent by hand. Notes scattered everywhere. You’re not doing anything wrong — you just deserve a better system.
          </p>

          {/* 4 Feature Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div className="flex items-start gap-3.5 bg-white p-4 rounded-xl border border-gray-100 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#8a1f3d]/10 text-[#8a1f3d] flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-[#1a1a1a]">Look professional</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  A clean, credible service page that earns trust.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 bg-white p-4 rounded-xl border border-gray-100 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#8a1f3d]/10 text-[#8a1f3d] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-[#1a1a1a]">Save time</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Clients book without endless back-and-forth.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 bg-white p-4 rounded-xl border border-gray-100 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#8a1f3d]/10 text-[#8a1f3d] flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-[#1a1a1a]">Get paid instantly</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Accept payments without chasing confirmations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 bg-white p-4 rounded-xl border border-gray-100 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#8a1f3d]/10 text-[#8a1f3d] flex items-center justify-center shrink-0">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-[#1a1a1a]">Run sessions easily</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Built-in video — no juggling separate tools.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onCreateSpace}
              className="bg-[#d9a35e] text-[#1a1a1a] px-8 py-4 rounded-xl font-bold hover:brightness-105 shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              Create your Business Space
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-gray-500 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Set up in under 10 minutes • No tech skills • No contracts
            </p>
          </div>
        </div>

        {/* Right Column Dark Box */}
        <div className="bg-[#1a1a1a] rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-12 relative aspect-square flex flex-col justify-center items-center text-center shadow-2xl border border-gray-800">
          <div className="w-16 h-16 rounded-full bg-[#8a1f3d]/20 border border-[#8a1f3d] flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-[#d9a35e]" />
          </div>

          <h3 className="text-white text-2xl sm:text-3xl md:text-4xl headline-serif leading-tight font-bold mb-4">
            You're not just taking sessions.<br />
            <span className="text-[#8a1f3d] italic font-serif">
              You're building something.
            </span>
          </h3>

          <p className="text-gray-400 text-xs sm:text-sm max-w-sm mt-2">
            Join hundreds of female consultants, coaches, and service providers managing end-to-end client relationships on Yuukke.
          </p>
        </div>
      </div>
    </section>
  );
};
