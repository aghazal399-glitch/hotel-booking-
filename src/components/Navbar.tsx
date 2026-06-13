import React from 'react';
import { Compass, BookOpen, Heart, Calendar, Menu, User, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  activeTab: 'explore' | 'bookings' | 'favorites';
  setActiveTab: (tab: 'explore' | 'bookings' | 'favorites') => void;
  bookingCount: number;
  favoriteCount: number;
}

export default function Navbar({ activeTab, setActiveTab, bookingCount, favoriteCount }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10 shadow-md" id="main-navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center">
            <button 
              onClick={() => setActiveTab('explore')}
              className="flex items-center gap-2.5 text-left group transition-all"
              id="brand-logo-btn"
            >
              <div className="p-2.5 bg-[#c4a661] rounded-xl text-black shadow-md group-hover:bg-[#d4bf8a] transition-all">
                <Sparkles className="w-5 h-5 animate-pulse text-neutral-900" />
              </div>
              <div>
                <span className="font-serif font-bold text-2xl tracking-tighter text-white block leading-none">
                  L&apos;AVENIR
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#c4a661] block mt-1">
                  PALACE & SANCTUARY
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('explore')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 cursor-pointer ${
                activeTab === 'explore'
                  ? 'bg-[#c4a661] text-[#0a0a0a] font-bold shadow-xs'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
              id="nav-explore-btn"
            >
              <Compass className="w-4 h-4" />
              <span>Hotels & Resorts</span>
            </button>

            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 cursor-pointer ${
                activeTab === 'favorites'
                  ? 'bg-[#c4a661] text-[#0a0a0a] font-bold shadow-xs'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
              id="nav-favorites-btn"
            >
              <div className="relative">
                <Heart className={`w-4 h-4 ${favoriteCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
                {favoriteCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {favoriteCount}
                  </span>
                )}
              </div>
              <span>Wishlist</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-[#c4a661] text-[#0a0a0a] font-bold shadow-xs'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
              id="nav-bookings-btn"
            >
              <div className="relative">
                <Calendar className="w-4 h-4" />
                {bookingCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#c4a661] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-black">
                    {bookingCount}
                  </span>
                )}
              </div>
              <span>My Stays</span>
            </button>
          </div>

          {/* Right Accessories (Profile Mock/Action Center) */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex flex-col text-right mr-2">
              <span className="text-xs text-white/40 font-mono">EN | USD ($)</span>
              <span className="text-[11px] text-amber-200 font-medium flex items-center gap-1 justify-end mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c4a661] animate-pulse"></span> Concierge Desk
              </span>
            </div>
            
            <div className="w-[1px] h-6 bg-white/10 hidden md:block"></div>

            <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-full border border-white/10">
              <div className="w-8 h-8 rounded-full bg-[#c4a661] text-neutral-900 font-bold text-xs flex items-center justify-center shadow-md">
                JD
              </div>
              <span className="text-xs font-semibold text-white/80 pr-2 hidden sm:inline">John Doe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a] border-t border-white/10 shadow-2xl px-6 py-2.5 flex justify-around">
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center gap-1 p-1 transition-all ${
            activeTab === 'explore' ? 'text-[#c4a661]' : 'text-white/40'
          }`}
          id="mobile-nav-explore"
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-medium">Explore</span>
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex flex-col items-center gap-1 p-1 relative transition-all ${
            activeTab === 'favorites' ? 'text-[#c4a661]' : 'text-white/40'
          }`}
          id="mobile-nav-favorites"
        >
          <Heart className={`w-5 h-5 ${favoriteCount > 0 && activeTab === 'favorites' ? 'fill-[#c4a661]' : favoriteCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
          {favoriteCount > 0 && (
            <span className="absolute top-0 right-1.5 bg-rose-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-black">
              {favoriteCount}
            </span>
          )}
          <span className="text-[10px] font-medium">Wishlist</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex flex-col items-center gap-1 p-1 relative transition-all ${
            activeTab === 'bookings' ? 'text-[#c4a661]' : 'text-white/40'
          }`}
          id="mobile-nav-bookings"
        >
          <Calendar className="w-5 h-5" />
          {bookingCount > 0 && (
            <span className="absolute top-0 right-2 bg-[#c4a661] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-black">
              {bookingCount}
            </span>
          )}
          <span className="text-[10px] font-medium">Stays</span>
        </button>
      </div>
    </nav>
  );
}
