import React, { useState } from 'react';
import { Search, Menu, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenModal: (type: 'marketplace' | 'builder' | 'mentor' | 'business_exchange') => void;
  onSelectCategory: (catId: string) => void;
  onOpenPortal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenModal, onSelectCategory, onOpenPortal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onOpenModal('marketplace');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fdfaf6]/95 backdrop-blur-md border-b border-gray-200/60 shadow-xs">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Left: Brand Logo & Main Links */}
        <div className="flex items-center space-x-8">
          <a href="#" className="flex items-center gap-3 group focus:outline-hidden" aria-label="Yuukke Homepage">
            <div className="flex flex-col">
              <span className="font-serif text-2xl md:text-3xl font-extrabold tracking-tight text-[#1a1a1a] group-hover:text-[#8a1f3d] transition-colors">
                Yuukke<span className="text-[#8a1f3d]">.</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest font-semibold text-[#8a1f3d] -mt-1">
                Buy Better • Live Better
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-7 text-sm font-medium text-gray-800">
            <button
              onClick={() => onSelectCategory('products')}
              className="hover:text-[#8a1f3d] transition-colors cursor-pointer py-1"
            >
              Shop
            </button>
            <button
              onClick={() => onSelectCategory('services')}
              className="hover:text-[#8a1f3d] transition-colors cursor-pointer py-1"
            >
              Services
            </button>
            <a
              href="#about-section"
              className="hover:text-[#8a1f3d] transition-colors py-1"
            >
              About Us
            </a>
            <button
              onClick={() => onSelectCategory('personal-gifts')}
              className="hover:text-[#8a1f3d] transition-colors cursor-pointer py-1"
            >
              Gifting
            </button>
          </div>
        </div>

        {/* Search Input (Desktop) */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex relative items-center max-w-xs w-full mx-4"
        >
          <Search className="w-4 h-4 absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search products, artisans, services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className={`w-full pl-9 pr-4 py-1.5 text-xs rounded-full border bg-white/80 transition-all outline-hidden ${
              isSearchFocused
                ? 'border-[#8a1f3d] ring-2 ring-[#8a1f3d]/10 bg-white'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          />
        </form>

        {/* Right CTAs */}
        <div className="flex items-center space-x-3">
          <div className="hidden xl:flex items-center space-x-2">
            <button
              onClick={() => onOpenModal('mentor')}
              className="px-4 py-2 border border-[#8a1f3d] text-[#8a1f3d] text-xs font-semibold rounded-full hover:bg-[#8a1f3d] hover:text-white transition-all cursor-pointer"
            >
              Become a Mentor
            </button>
            <button
              onClick={() => onOpenModal('business_exchange')}
              className="px-4 py-2 border border-[#8a1f3d] text-[#8a1f3d] text-xs font-semibold rounded-full hover:bg-[#8a1f3d] hover:text-white transition-all cursor-pointer"
            >
              Business Exchange
            </button>
          </div>

          <button
            onClick={() => onOpenModal('marketplace')}
            className="bg-[#8a1f3d] text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#721831] shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d9a35e]" />
            Explore Marketplace
          </button>
          <button
            onClick={onOpenPortal}
            className="hidden sm:flex border border-[#8a1f3d] text-[#8a1f3d] px-4 py-2.5 rounded-full text-xs font-bold hover:bg-[#8a1f3d] hover:text-white transition-all cursor-pointer"
          >
            Entrepreneur Portal
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fdfaf6] border-b border-gray-200 px-4 pt-3 pb-6 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, artisans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-gray-300 bg-white"
            />
          </form>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium pt-2">
            <button
              onClick={() => {
                onSelectCategory('products');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 text-left rounded-lg bg-white border border-gray-100 hover:border-[#8a1f3d] text-gray-800"
            >
              🛍️ Shop
            </button>
            <button
              onClick={() => {
                onSelectCategory('services');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 text-left rounded-lg bg-white border border-gray-100 hover:border-[#8a1f3d] text-gray-800"
            >
              💡 Services
            </button>
            <a
              href="#about-section"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-left rounded-lg bg-white border border-gray-100 text-gray-800"
            >
              ℹ️ About Us
            </a>
            <button
              onClick={() => {
                onSelectCategory('personal-gifts');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 text-left rounded-lg bg-white border border-gray-100 hover:border-[#8a1f3d] text-gray-800"
            >
              🎁 Gifting
            </button>
          </div>

          <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
            <button
              onClick={() => {
                onOpenModal('mentor');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2.5 border border-[#8a1f3d] text-[#8a1f3d] text-xs font-semibold rounded-full hover:bg-[#8a1f3d] hover:text-white transition-all"
            >
              Become a Mentor
            </button>
            <button
              onClick={() => {
                onOpenModal('business_exchange');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2.5 border border-[#8a1f3d] text-[#8a1f3d] text-xs font-semibold rounded-full hover:bg-[#8a1f3d] hover:text-white transition-all"
            >
              Business Exchange
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
