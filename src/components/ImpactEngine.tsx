import React, { useState } from 'react';
import { ShoppingBag, Heart, GraduationCap, Award, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface PurchaseOption {
  id: string;
  name: string;
  category: string;
  price: number;
  artisanDays: number;
  academyHours: number;
  microCapital: number;
  image: string;
}

const PURCHASE_OPTIONS: PurchaseOption[] = [
  {
    id: 'silk',
    name: 'Handcrafted Banarasi Silk Stole',
    category: 'Varanasi Weavers Cohort',
    price: 45,
    artisanDays: 6,
    academyHours: 4,
    microCapital: 12,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'leather',
    name: 'Artisan Executive Leather Organizer',
    category: 'Kanpur Women Guild',
    price: 60,
    artisanDays: 8,
    academyHours: 6,
    microCapital: 18,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'service',
    name: 'E-commerce Brand Identity Package',
    category: 'Yuukke Tech Expert Hub',
    price: 120,
    artisanDays: 14,
    academyHours: 12,
    microCapital: 35,
    image: 'https://images.unsplash.com/photo-1542744094-3a31b272c490?auto=format&fit=crop&w=400&q=80',
  },
];

export const ImpactEngine: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('silk');
  const [quantity, setQuantity] = useState<number>(1);

  const selectedItem = PURCHASE_OPTIONS.find((o) => o.id === selectedId) || PURCHASE_OPTIONS[0];

  const totalSpent = selectedItem.price * quantity;
  const totalArtisanDays = selectedItem.artisanDays * quantity;
  const totalAcademyHours = selectedItem.academyHours * quantity;
  const totalMicroCapital = selectedItem.microCapital * quantity;

  return (
    <section className="bg-[#fdfaf6] border-y border-gray-200/80 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs font-bold tracking-widest text-[#8a1f3d] uppercase mb-3 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#d9a35e]" />
            MORE THAN A MARKETPLACE — AN IMPACT ENGINE
            <Sparkles className="w-3.5 h-3.5 text-[#d9a35e]" />
          </p>
          <h2 className="headline-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] max-w-3xl mx-auto">
            A marketplace is what you see.<br />
            <span className="text-[#8a1f3d] italic">Impact is what happens next.</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base mt-4 leading-relaxed">
            In five seconds, visitors should understand the Yuukke model: what they buy on the left, and what every purchase enables on the right.
          </p>
        </div>

        {/* Interactive Impact Visualization Container */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xl overflow-hidden p-6 sm:p-10">
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-gray-100 flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#8a1f3d]"></span>
              <span className="font-bold text-sm text-gray-800 uppercase tracking-wider">
                Live Impact Simulator
              </span>
            </div>
            <div className="text-xs text-gray-500 bg-[#fdfaf6] px-3 py-1.5 rounded-full border border-gray-200">
              100% Verified Transparent Metric Engine
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: What You Buy */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#8a1f3d] uppercase tracking-wider">
                  1. What You Buy
                </span>
                <span className="text-xs text-gray-400">Select Item</span>
              </div>

              <div className="space-y-3">
                {PURCHASE_OPTIONS.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                      selectedId === item.id
                        ? 'border-[#8a1f3d] bg-[#8a1f3d]/5 ring-2 ring-[#8a1f3d]/10'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-gray-500">{item.category}</p>
                      <p className="text-xs font-semibold text-[#8a1f3d] mt-0.5">
                        ${item.price} USD
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quantity Selector */}
              <div className="bg-[#fdfaf6] p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-800">Order Quantity</p>
                  <p className="text-[11px] text-gray-500">Total: ${totalSpent} USD</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-gray-300 font-bold text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="font-bold text-sm w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-gray-300 font-bold text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Middle Connecting Arrow */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center text-center py-4 lg:py-0">
              <div className="w-12 h-12 rounded-full bg-[#8a1f3d] text-white flex items-center justify-center shadow-md animate-bounce">
                <ArrowRight className="w-6 h-6 rotate-90 lg:rotate-0" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mt-2">
                Enables Directly
              </span>
            </div>

            {/* Right: What Every Purchase Enables */}
            <div className="lg:col-span-5 bg-[#1a1a1a] text-white rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#d9a35e] uppercase tracking-wider">
                  2. What It Enables
                </span>
                <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Direct Impact
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                  <Heart className="w-5 h-5 text-[#d9a35e] mb-2" />
                  <div className="text-2xl font-bold font-serif text-white">
                    {totalArtisanDays} Days
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Artisan Independence Income
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                  <GraduationCap className="w-5 h-5 text-emerald-400 mb-2" />
                  <div className="text-2xl font-bold font-serif text-white">
                    {totalAcademyHours} Hrs
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Yuukke Academy Tech Upskilling
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                  <Award className="w-5 h-5 text-sky-400 mb-2" />
                  <div className="text-2xl font-bold font-serif text-white">
                    ${totalMicroCapital}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Community Micro-Reinvestment
                  </p>
                </div>
              </div>

              <div className="bg-white/10 p-3.5 rounded-xl text-xs text-gray-300 leading-relaxed border border-white/10">
                <p>
                  💡 <span className="font-semibold text-white">Every dollar spent</span> bypasses middlemen, directly crediting the female builder's verified account while funding peer-to-peer training cohorts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
