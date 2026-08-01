import React, { useState } from 'react';
import { ModalType, CategoryItem } from '../types';
import { X, CheckCircle2, Sparkles, ArrowRight, Star, ShieldCheck, ShoppingBag, Send } from 'lucide-react';

interface ModalsProps {
  modalState: ModalType;
  onClose: () => void;
}

export const Modals: React.FC<ModalsProps> = ({ modalState, onClose }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  if (!modalState.isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const resetAndClose = () => {
    setFormSubmitted(false);
    setEmailInput('');
    setNameInput('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#fdfaf6] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-gray-200 relative max-h-[90vh] flex flex-col">
        {/* Close button */}
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center shadow-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content Routing */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {formSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="headline-serif text-2xl font-bold text-gray-900">
                Application Received!
              </h3>
              <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-[#8a1f3d]">{nameInput || 'Builder'}</span>. A Yuukke onboarding concierge will review your credentials and get in touch at <span className="font-semibold">{emailInput || 'your email'}</span> within 24 hours.
              </p>
              <button
                onClick={resetAndClose}
                className="bg-[#8a1f3d] text-white px-8 py-3 rounded-full text-xs font-bold hover:bg-[#721831] transition-all cursor-pointer mt-4"
              >
                Return to Yuukke
              </button>
            </div>
          ) : (
            <>
              {/* Marketplace Explorer */}
              {modalState.type === 'marketplace' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#8a1f3d] text-white flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="headline-serif text-2xl font-bold text-[#1a1a1a]">
                        Yuukke Marketplace Explorer
                      </h3>
                      <p className="text-xs text-gray-500">
                        100% Women-Owned Brands &amp; Expert Services
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-white border border-gray-200">
                      <p className="text-xs font-bold text-[#8a1f3d] uppercase mb-1">
                        Trending Product
                      </p>
                      <p className="font-bold text-sm text-gray-900">
                        Banarasi Zardozi Stole
                      </p>
                      <p className="text-xs text-gray-500">
                        Artisan: Sunita Devi (Varanasi Guild)
                      </p>
                      <div className="mt-3 flex justify-between items-center text-xs">
                        <span className="font-bold text-[#8a1f3d]">$45 USD</span>
                        <span className="text-amber-600 font-semibold flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 4.9 (88)
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-gray-200">
                      <p className="text-xs font-bold text-[#8a1f3d] uppercase mb-1">
                        Featured Service
                      </p>
                      <p className="font-bold text-sm text-gray-900">
                        E-commerce Brand Audit
                      </p>
                      <p className="text-xs text-gray-500">
                        Expert: Priya Sharma (Yuukke Hub)
                      </p>
                      <div className="mt-3 flex justify-between items-center text-xs">
                        <span className="font-bold text-[#8a1f3d]">$60 USD / Session</span>
                        <span className="text-amber-600 font-semibold flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 5.0 (42)
                        </span>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl border border-gray-200 space-y-3">
                    <p className="font-bold text-xs text-gray-800 uppercase tracking-wider">
                      Request Catalog Access or Bulk Order Quote
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="px-3.5 py-2 text-xs rounded-xl border border-gray-300 bg-[#fdfaf6]"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Your Email Address"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="px-3.5 py-2 text-xs rounded-xl border border-gray-300 bg-[#fdfaf6]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#8a1f3d] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-[#721831] transition-all flex items-center justify-center gap-2"
                    >
                      Access Marketplace Catalog <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}

              {/* Become a Builder */}
              {modalState.type === 'builder' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#8a1f3d] text-white flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-[#d9a35e]" />
                    </div>
                    <div>
                      <h3 className="headline-serif text-2xl font-bold text-[#1a1a1a]">
                        Join Yuukke as a Builder
                      </h3>
                      <p className="text-xs text-gray-500">
                        Turn your craft or service into a sustainable business
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-[#8a1f3d]/5 rounded-2xl border border-[#8a1f3d]/20 text-xs text-gray-700 leading-relaxed">
                    <p className="font-bold text-[#8a1f3d] mb-1">Included in Builder Membership:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Permanent digital storefront &amp; verified credential profile</li>
                      <li>Yuukke Academy access (e-commerce, digital marketing, export)</li>
                      <li>Payment gateway integration with direct bank settlements</li>
                    </ul>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Full Name / Business Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maya Devi Arts"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="maya@example.com"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 bg-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#8a1f3d] text-white py-3 rounded-xl font-bold text-xs hover:bg-[#721831] transition-all flex items-center justify-center gap-2"
                    >
                      Submit Builder Onboarding <Send className="w-3.5 h-3.5 text-[#d9a35e]" />
                    </button>
                  </form>
                </div>
              )}

              {/* Become a Mentor */}
              {modalState.type === 'mentor' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#8a1f3d] text-white flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <h3 className="headline-serif text-2xl font-bold text-[#1a1a1a]">
                        Become a Yuukke Mentor
                      </h3>
                      <p className="text-xs text-gray-500">
                        Guide emerging women builders, lead masterclasses, and share expertise
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. Anita Roy"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="anita@example.com"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 bg-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#8a1f3d] text-white py-3 rounded-xl font-bold text-xs hover:bg-[#721831] transition-all flex items-center justify-center gap-2"
                    >
                      Apply as Mentor
                    </button>
                  </form>
                </div>
              )}

              {/* Business Exchange / Service Space */}
              {(modalState.type === 'business_exchange' || modalState.type === 'service_space') && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#d9a35e] text-[#1a1a1a] flex items-center justify-center font-bold">
                      B2B
                    </div>
                    <div>
                      <h3 className="headline-serif text-2xl font-bold text-[#1a1a1a]">
                        {modalState.type === 'service_space'
                          ? 'Create Your Yuukke Business Space'
                          : 'Yuukke Corporate Business Exchange'}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Set up your automated booking, payments, and client portal in minutes
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Contact Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Work Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 bg-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#d9a35e] text-[#1a1a1a] py-3 rounded-xl font-bold text-xs hover:brightness-105 transition-all"
                    >
                      Launch Business Space Setup
                    </button>
                  </form>
                </div>
              )}

              {/* Category Detail Modal */}
              {modalState.type === 'category_detail' && modalState.data && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={(modalState.data as CategoryItem).image}
                      alt={(modalState.data as CategoryItem).title}
                      className="w-16 h-16 rounded-2xl object-cover shadow-md"
                    />
                    <div>
                      <h3 className="headline-serif text-2xl font-bold text-[#1a1a1a]">
                        {(modalState.data as CategoryItem).title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {(modalState.data as CategoryItem).subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-bold text-[#8a1f3d] uppercase tracking-wider">
                      Popular Items &amp; Services:
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {(modalState.data as CategoryItem).popularItems?.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-white rounded-xl border border-gray-200 flex justify-between items-center text-xs font-medium text-gray-800"
                        >
                          <span>{item}</span>
                          <span className="text-[#8a1f3d] font-bold">In Stock</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      resetAndClose();
                      // open marketplace
                    }}
                    className="w-full bg-[#8a1f3d] text-white py-3 rounded-xl font-bold text-xs hover:bg-[#721831] transition-all flex items-center justify-center gap-2"
                  >
                    Browse All {(modalState.data as CategoryItem).title}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
