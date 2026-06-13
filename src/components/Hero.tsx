import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Landmark, ArrowRight, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { LOCATIONS_LIST } from '../data';
import { FilterState } from '../types';

interface HeroProps {
  filterState: FilterState;
  setFilterState: (filters: FilterState) => void;
  onSearchSubmit: () => void;
}

export default function Hero({ filterState, setFilterState, onSearchSubmit }: HeroProps) {
  const [localSearch, setLocalSearch] = useState(filterState.search);
  const [localLocation, setLocalLocation] = useState(filterState.location);
  const [guests, setLocalGuests] = useState(2);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilterState({
      ...filterState,
      search: localSearch,
      location: localLocation === 'All Locations' ? '' : localLocation
    });
    onSearchSubmit();
  };

  return (
    <div className="relative min-h-[560px] lg:min-h-[640px] flex items-center justify-center bg-black overflow-hidden" id="hero-banner">
      {/* Background visual artwork */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80" 
          alt="Luxury Resort Horizon" 
          className="w-full h-full object-cover object-center opacity-65 scale-105"
        />
        {/* Luxe gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/40 to-neutral-950/70" />
      </div>

      {/* Decorative Brand Accent Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Content Outer Wrapper */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24 flex flex-col items-center justify-center text-center z-10">
        {/* Mini Pill Tagline */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-[#c4a661]/10 border border-[#c4a661]/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md"
        >
          <Star className="w-3.5 h-3.5 text-[#c4a661] fill-[#c4a661] animate-pulse" />
          <span className="text-xs font-mono font-medium tracking-widest text-[#c4a661] uppercase">
            Curated World-Class Sanctuaries
          </span>
        </motion.div>

        {/* Hero Headlines */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-serif font-normal tracking-tight text-white max-w-4xl leading-tight"
        >
          Where Luxury Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c4a661] via-[#ebd498] to-[#c4a661] italic">Unforgettable</span> Memories
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg lg:text-xl text-white/60 max-w-2xl mt-6 font-sans font-light"
        >
          Indulge in our handpicked collection of palace-status suites, tropical private pool villas, and iconic historical landmarks.
        </motion.p>

        {/* Dynamic Search Console */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-5xl mt-12 bg-[#1a1a1a] rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 border border-white/10 text-left"
          id="search-console-wrapper"
        >
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            
            {/* Search Input */}
            <div className="flex flex-col gap-1.5 border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0 md:pr-4">
              <label className="text-[10px] font-mono tracking-wider text-[#c4a661] uppercase font-bold flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-[#c4a661]" />
                Hotel Search
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="e.g. Marina Bay Sands..."
                  className="w-full bg-transparent border-none p-0 text-sm font-semibold text-white placeholder-white/35 focus:outline-none mt-1"
                  id="hotel-name-search-input"
                />
              </div>
            </div>

            {/* Destination Selector */}
            <div className="flex flex-col gap-1.5 border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0 md:px-4">
              <label className="text-[10px] font-mono tracking-wider text-[#c4a661] uppercase font-bold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#c4a661]" />
                Destination Group
              </label>
              <select 
                value={localLocation}
                onChange={(e) => setLocalLocation(e.target.value)}
                className="w-full bg-transparent border-0 p-0 text-sm font-semibold text-white focus:outline-none focus:ring-0 mt-1 appearance-none cursor-pointer"
                id="destination-location-selector"
              >
                {LOCATIONS_LIST.map((loc) => (
                  <option key={loc} value={loc} className="text-white bg-[#1a1a1a]">
                    {loc === 'All Locations' ? 'Anywhere in the World' : loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Dates */}
            <div className="flex flex-col gap-1.5 border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0 md:px-4">
              <label className="text-[10px] font-mono tracking-wider text-[#c4a661] uppercase font-bold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#c4a661]" />
                Check In &ndash; Out
              </label>
              <div className="flex items-center gap-1 mt-1">
                <input 
                  type="date" 
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="bg-transparent border-0 p-0 text-[11px] sm:text-xs font-semibold text-white focus:outline-none focus:ring-0 w-1/2 cursor-pointer [color-scheme:dark]"
                  id="checkout-checkin-start"
                />
                <span className="text-white/20 text-xs font-light">|</span>
                <input 
                  type="date" 
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || new Date().toISOString().split('T')[0]}
                  className="bg-transparent border-0 p-0 text-[11px] sm:text-xs font-semibold text-white focus:outline-none focus:ring-0 w-1/2 cursor-pointer [color-scheme:dark]"
                  id="checkout-checkin-end"
                />
              </div>
            </div>

            {/* Guests Input & Form Submission */}
            <div className="flex items-center justify-between gap-4 md:pl-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono tracking-wider text-[#c4a661] uppercase font-bold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#c4a661]" />
                  Travelers
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <button 
                    type="button" 
                    onClick={() => setLocalGuests(prev => Math.max(1, prev - 1))}
                    className="w-5 h-5 rounded-full border border-white/10 text-white/80 flex items-center justify-center hover:bg-white/5 text-xs font-bold font-mono transition-colors"
                  >
                    -
                  </button>
                  <span className="text-sm font-semibold text-white w-4 text-center">{guests}</span>
                  <button 
                    type="button" 
                    onClick={() => setLocalGuests(prev => Math.min(10, prev + 1))}
                    className="w-5 h-5 rounded-full border border-white/10 text-white/80 flex items-center justify-center hover:bg-white/5 text-xs font-bold font-mono transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <button 
                type="submit"
                className="flex-1 md:flex-none flex items-center justify-center bg-[#c4a661] text-[#0a0a0a] font-bold text-sm rounded-xl px-5 py-3.5 shadow-lg hover:bg-[#d4bf8a] transition-all gap-2 cursor-pointer"
                id="search-sanctuaries-submit-btn"
              >
                <Search className="w-4 h-4" />
                <span className="md:hidden lg:inline text-xs font-bold uppercase tracking-wider">Search</span>
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
}
