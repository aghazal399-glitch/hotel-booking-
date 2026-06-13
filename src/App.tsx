import React, { useState, useEffect, useMemo } from 'react';
import { Compass, BookOpen, Heart, Calendar, ArrowRight, ShieldCheck, HelpCircle, Star, Sparkles, Building, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Data, Types, Components
import { HOTELS, ROOMS } from './data';
import { Hotel, Room, Booking, FilterState } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Filters from './components/Filters';
import HotelCard from './components/HotelCard';
import BookingModal from './components/BookingModal';
import BookingsHistory from './components/BookingsHistory';

export default function App() {
  // Navigation Tabs State
  const [activeTab, setActiveTab] = useState<'explore' | 'bookings' | 'favorites'>('explore');

  // Bookings Store state (with client local persistence)
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('luxe_hotel_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  // Favorites list store state (with client local persistence)
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('luxe_hotel_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Search/Filters conditions
  const [filterState, setFilterState] = useState<FilterState>({
    search: '',
    location: '',
    minPrice: 0,
    maxPrice: 2000,
    rating: null,
    amenities: []
  });

  // Accordion details toggle states (expanded hotel room cards)
  const [expandedHotelId, setExpandedHotelId] = useState<string | null>(null);

  // Active check-out checkout wizard
  const [bookingTarget, setBookingTarget] = useState<{ room: Room; hotel: Hotel } | null>(null);

  // Auto-scrolling element trigger
  const resultsRef = React.useRef<HTMLDivElement>(null);

  // Synchronize localStorage on states update
  useEffect(() => {
    localStorage.setItem('luxe_hotel_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('luxe_hotel_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Handle favorites toggle
  const handleToggleFavorite = (hotelId: string) => {
    setFavorites(prev => {
      if (prev.includes(hotelId)) {
        return prev.filter(id => id !== hotelId);
      } else {
        return [...prev, hotelId];
      }
    });
  };

  // Add simulated reservation
  const handleAddBooking = (newBookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    const completeBooking: Booking = {
      ...newBookingData,
      id: `LUX-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toLocaleDateString()
    };
    setBookings(prev => [completeBooking, ...prev]);
  };

  // Cancel simulated reservation
  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you would like to revoke this luxury safari or hotel reservation?')) {
      setBookings(prev => prev.filter(b => b.id !== bookingId));
    }
  };

  // Scroll smoothly to filtered items on search submit
  const handleSearchSubmit = () => {
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  // Filter computation logic (Memoized)
  const filteredHotels = useMemo(() => {
    return HOTELS.filter((hotel) => {
      // 1. Text Search matches hotel name, description, or location
      if (filterState.search) {
        const query = filterState.search.toLowerCase();
        const matchesName = hotel.name.toLowerCase().includes(query);
        const matchesDesc = hotel.description.toLowerCase().includes(query);
        const matchesLoc = hotel.location.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesLoc) return false;
      }

      // 2. Location matching (Exact select)
      if (filterState.location && hotel.location !== filterState.location) {
        return false;
      }

      // 3. Max Price boundary checking
      if (hotel.priceFrom > filterState.maxPrice) {
        return false;
      }

      // 4. Star Rating boundary verification
      if (filterState.rating && hotel.rating < filterState.rating) {
        return false;
      }

      // 5. Essential Amenities (Must match ALL selected amenities)
      if (filterState.amenities.length > 0) {
        const hasAll = filterState.amenities.every(am => hotel.amenities.includes(am));
        if (!hasAll) return false;
      }

      return true;
    });
  }, [filterState]);

  // Compute favorite hotels list (Memoized)
  const favoriteHotels = useMemo(() => {
    return HOTELS.filter(hotel => favorites.includes(hotel.id));
  }, [favorites]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-20 md:pb-0 font-sans text-white/90" id="hotel-applet-root">
      
      {/* Top sticky navbar navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        bookingCount={bookings.filter(b => b.status === 'confirmed').length}
        favoriteCount={favorites.length}
      />

      {/* Main Page structure */}
      <AnimatePresence mode="wait">
        
        {/* TAB 1: EXPLORE PAGE WITH HERO AND LISTINGS */}
        {activeTab === 'explore' && (
          <motion.div
            key="explore-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Visual background header */}
            <Hero 
              filterState={filterState} 
              setFilterState={setFilterState} 
              onSearchSubmit={handleSearchSubmit}
            />

            {/* Results Grid / Sidebar combo container */}
            <div ref={resultsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="results-and-filters">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Desktop sidebar filters panel */}
                <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
                  <Filters 
                    filterState={filterState} 
                    setFilterState={setFilterState}
                    hotelCount={filteredHotels.length}
                  />
                </div>

                {/* Mobile discrete interactive filter pill list */}
                <div className="lg:hidden col-span-1 flex flex-wrap gap-2 py-4 mb-4 border-y border-white/5">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-white/40 w-full mb-1">
                    ACTIVE CONTROLS
                  </span>
                  
                  {/* Quick Locations Dropdown */}
                  <select 
                    value={filterState.location}
                    onChange={(e) => setFilterState({ ...filterState, location: e.target.value })}
                    className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-1.5 text-xs font-semibold text-white outline-none cursor-pointer"
                    id="mobile-location-quickselect"
                  >
                    <option value="" className="bg-[#1a1a1a]">Anywhere</option>
                    {HOTELS.map(h => h.location).filter((v, i, a) => a.indexOf(v) === i).map(loc => (
                      <option key={loc} value={loc} className="bg-[#1a1a1a]">{loc}</option>
                    ))}
                  </select>

                  {/* Rating selector */}
                  <select
                    value={filterState.rating || ''}
                    onChange={(e) => setFilterState({ ...filterState, rating: e.target.value ? Number(e.target.value) : null })}
                    className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-1.5 text-xs font-semibold text-white outline-none cursor-pointer"
                    id="mobile-rating-quickselect"
                  >
                    <option value="" className="bg-[#1a1a1a]">Any Rating</option>
                    <option value="4.9" className="bg-[#1a1a1a]">4.9 Exquisite Only</option>
                    <option value="4.8" className="bg-[#1a1a1a]">4.8+ Superb</option>
                    <option value="4.7" className="bg-[#1a1a1a]">4.7+ Excellent</option>
                  </select>

                  {/* Reset button */}
                  {(filterState.search || filterState.location || filterState.rating || filterState.amenities.length > 0) && (
                    <button 
                      onClick={() => setFilterState({ search: '', location: '', minPrice: 0, maxPrice: 2000, rating: null, amenities: [] })}
                      className="bg-[#c4a661] text-black font-mono text-[10px] px-3 py-1.5 rounded-lg uppercase tracking-wider font-bold cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Main Hotel Listings cards */}
                <div className="lg:col-span-8 xl:col-span-9 space-y-6">
                  
                  {/* Listings header panel */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 gap-3 border-b border-white/5">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-serif font-normal text-white tracking-tight">
                        {filterState.location ? `Sanctuaries in ${filterState.location}` : 'Signature Destination Estates'}
                      </h2>
                      <p className="text-xs text-white/55 mt-0.5">Explore availability, rates, and detailed room collections.</p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-white/40 font-mono">
                      <span>Refined count:</span>
                      <strong className="text-white font-sans text-sm">{filteredHotels.length}</strong>
                    </div>
                  </div>

                  {filteredHotels.length === 0 ? (
                    /* Search results empty state */
                    <div className="text-center py-20 bg-[#1a1a1a] border border-white/10 rounded-3xl p-8" id="empty-listings-slate">
                      <div className="mx-auto w-12 h-12 bg-white/5 text-[#c4a661] rounded-full flex items-center justify-center mb-4 border border-white/5">
                        <Landmark className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-serif font-normal text-white">
                        No Matching Sanctuaries Found
                      </h3>
                      <p className="text-xs text-white/50 max-w-sm mx-auto mt-1 leading-relaxed">
                        We couldn&apos;t locate any matching hotel for your criteria. Try loosening budget range, changing target location, or removing specific conveniences.
                      </p>
                      <button
                        onClick={() => setFilterState({ search: '', location: '', minPrice: 0, maxPrice: 2000, rating: null, amenities: [] })}
                        className="mt-6 bg-[#c4a661] hover:bg-[#d4bf8a] text-black font-semibold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-colors cursor-pointer"
                        id="empty-reset-filters-btn"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    /* Hotel Cards map */
                    filteredHotels.map((hotel) => (
                      <HotelCard 
                        key={hotel.id}
                        hotel={hotel}
                        isFavorite={favorites.includes(hotel.id)}
                        onToggleFavorite={() => handleToggleFavorite(hotel.id)}
                        rooms={ROOMS.filter(r => r.hotelId === hotel.id)}
                        expanded={expandedHotelId === hotel.id}
                        onToggleExpanded={() => setExpandedHotelId(prev => prev === hotel.id ? null : hotel.id)}
                        onBookRoom={(room, htl) => setBookingTarget({ room, hotel: htl })}
                      />
                    ))
                  )}

                </div>

              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: MY RESERVATIONS VIEW */}
        {activeTab === 'bookings' && (
          <motion.div
            key="bookings-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          >
            <BookingsHistory 
              bookings={bookings}
              onCancelBooking={handleCancelBooking}
              onExploreClick={() => setActiveTab('explore')}
            />
          </motion.div>
        )}

        {/* TAB 3: SAVED FAVORITES RETREATS VIEW */}
        {activeTab === 'favorites' && (
          <motion.div
            key="favorites-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
            id="saved-favorites-section"
          >
            <div className="max-w-5xl mx-auto space-y-6">
              
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#c4a661] uppercase block font-bold">FAVORITES DIRECTORY</span>
                <h2 className="text-2xl font-serif font-normal text-white mt-1">
                  My Elite Collection
                </h2>
                <p className="text-xs text-white/60 mt-1">Your saved selection of boutique estates, luxury spa resorts, and panoramic city suites.</p>
              </div>

              {favoriteHotels.length === 0 ? (
                /* Favorites empty state */
                <div className="text-center py-20 bg-[#1a1a1a] border border-white/10 rounded-3xl p-8" id="empty-favorites-slate">
                  <div className="mx-auto w-12 h-12 bg-white/5 text-[#c4a661] rounded-full flex items-center justify-center mb-4 border border-white/5">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-serif font-normal text-white">
                    Your Wishlist is Empty
                  </h3>
                  <p className="text-xs text-white/50 max-w-sm mx-auto mt-1 leading-relaxed">
                    Click the boutique heart icon on properties across our destinations to curate a private directory of locations.
                  </p>
                  <button
                    onClick={() => setActiveTab('explore')}
                    className="mt-6 bg-[#c4a661] hover:bg-[#d4bf8a] text-black font-semibold text-xs py-3 px-5 rounded-xl transition-all cursor-pointer font-sans tracking-wider uppercase font-bold"
                    id="favorites-empty-cta"
                  >
                    Start Exploring
                  </button>
                </div>
              ) : (
                /* Map favorites */
                favoriteHotels.map((hotel) => (
                  <HotelCard 
                    key={hotel.id}
                    hotel={hotel}
                    isFavorite={true}
                    onToggleFavorite={() => handleToggleFavorite(hotel.id)}
                    rooms={ROOMS.filter(r => r.hotelId === hotel.id)}
                    expanded={expandedHotelId === hotel.id}
                    onToggleExpanded={() => setExpandedHotelId(prev => prev === hotel.id ? null : hotel.id)}
                    onBookRoom={(room, htl) => setBookingTarget({ room, hotel: htl })}
                  />
                ))
              )}

            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Dynamic unified reservation checkout drawer/modal */}
      {bookingTarget && (
        <BookingModal 
          isOpen={true}
          room={bookingTarget.room}
          hotel={bookingTarget.hotel}
          onClose={() => setBookingTarget(null)}
          onSubmitBooking={(formData) => {
            handleAddBooking(formData);
          }}
        />
      )}

      {/* Aesthetic Footer */}
      <footer className="bg-black text-white/50 border-t border-white/5 py-12 px-6 tracking-wide text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <span className="font-serif font-normal tracking-tight text-white block text-sm">LÔRE &amp; LUXE</span>
            <p className="text-[11px] text-white/40 leading-relaxed font-sans font-light">
              Designing immersive hospitality voyages in majestic destinations across Bali, Paris, Singapore, Como, and beyond.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-white font-bold block">Sanctuaries</span>
            <ul className="space-y-1 text-white/35 text-[11px]">
              <li>Amandari Resort, Ubud</li>
              <li>Plaza Athénée, Paris</li>
              <li>Marina Bay Sands, Singapore</li>
              <li>Grand Hotel Tremezzo, Como</li>
            </ul>
          </div>
          <div className="space-y-2">
            <span className="text-white font-bold block">Concierge &amp; Help Desk</span>
            <ul className="space-y-1 text-white/35 text-[11px]">
              <li>Bespoke Itineraries</li>
              <li>Heliport Bookings</li>
              <li>Butler Dispatch</li>
              <li>Security Auditing</li>
            </ul>
          </div>
          <div className="space-y-2">
            <span className="text-white font-bold block">Exclusive Privilege</span>
            <p className="text-[11px] text-white/35 leading-relaxed">
              Earn status tiers, unlock late checkout privileges, and enjoy complimentary airport transfers on every reservation.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-10 pt-6 text-center text-[10px] text-white/20 font-mono">
          &copy; 2026 LÔRE &amp; LUXE HOTELS INC. ALL RIGHTS RESERVED. SIMULATED RESORT OFFICE.
        </div>
      </footer>

    </div>
  );
}
