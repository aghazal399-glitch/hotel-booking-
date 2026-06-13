import React from 'react';
import { Star, MapPin, Heart, ChevronDown, ChevronUp, Share2, Compass, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Hotel, Room } from '../types';
import RoomCard from './RoomCard';

interface HotelCardProps {
  key?: string | number;
  hotel: Hotel;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  rooms: Room[];
  expanded: boolean;
  onToggleExpanded: () => void;
  onBookRoom: (room: Room, hotel: Hotel) => void;
}

export default function HotelCard({
  hotel,
  isFavorite,
  onToggleFavorite,
  rooms,
  expanded,
  onToggleExpanded,
  onBookRoom
}: HotelCardProps) {
  return (
    <div 
      className="bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 mb-6"
      id={`hotelcard-${hotel.id}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Cover image area */}
        <div className="relative h-64 lg:h-auto lg:col-span-5 overflow-hidden">
          <img 
            src={hotel.image} 
            alt={hotel.name} 
            className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-500"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
          
          {/* Tagline Popular highlight ribbon */}
          {hotel.popularReason && (
            <div className="absolute top-4 left-4 bg-[#c4a661] text-[#0a0a0a] text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg tracking-widest uppercase flex items-center gap-1.5 shadow-md">
              <Star className="w-3" />
              <span>{hotel.popularReason}</span>
            </div>
          )}

          {/* Quick price helper pill for users */}
          <div className="absolute bottom-4 left-4 text-white">
            <span className="text-[10px] font-mono text-white/65 tracking-wider block uppercase">RATES FROM</span>
            <span className="text-xl font-serif font-bold text-white">${hotel.priceFrom} <span className="text-xs font-sans font-normal text-white/50">/ night</span></span>
          </div>
        </div>

        {/* Content area */}
        <div className="p-6 lg:p-7 lg:col-span-7 flex flex-col justify-between">
          <div>
            {/* Header tags and action tools */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs text-white/60 font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#c4a661]" />
                <span>{hotel.location}</span>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onToggleFavorite}
                  className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 shadow-xs transition-colors cursor-pointer"
                  id={`favorite-hotel-btn-${hotel.id}`}
                  title="Toggle favorite status"
                >
                  <Heart className={`w-4 h-4 transition-all ${isFavorite ? 'fill-rose-500 text-rose-500 scale-110' : 'text-white/40'}`} />
                </button>
              </div>
            </div>

            {/* Hotel Title */}
            <h3 className="text-xl sm:text-2xl font-serif font-normal text-white tracking-tight leading-tight mb-2">
              {hotel.name}
            </h3>

            {/* Rating display */}
            <div className="flex items-center gap-2 mb-4 bg-[#c4a661]/10 border border-[#c4a661]/25 rounded-xl px-3 py-1.5 w-fit">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-[#c4a661] text-[#c4a661]" />
                ))}
              </div>
              <span className="text-xs font-mono font-bold text-[#c4a661]">{hotel.rating}</span>
              <span className="text-white/20 font-light">|</span>
              <span className="text-xs text-white/50">{hotel.reviewsCount} verified reviews</span>
            </div>

            {/* Summary description */}
            <p className="text-sm text-white/70 leading-relaxed font-sans mb-5 font-light mt-1">
              {hotel.description}
            </p>

            {/* Amenities Tag Cloud */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {hotel.amenities.map((amenity) => (
                <span 
                  key={amenity}
                  className="bg-white/5 border border-white/5 text-white/80 px-2.5 py-1 rounded-lg text-[11px] font-mono uppercase tracking-wider"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Expand and CTA section */}
          <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="text-left">
              <span className="text-[10px] font-mono text-white/45 uppercase tracking-widest block">SUITE OPTIONS</span>
              <span className="text-xs text-white/60 font-semibold">{rooms.length} luxury suites available</span>
            </div>

            <button
              onClick={onToggleExpanded}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                expanded 
                  ? 'bg-white/10 text-white hover:bg-white/20' 
                  : 'bg-[#c4a661] text-[#0a0a0a] hover:bg-[#d4bf8a] shadow-md hover:shadow-lg'
              }`}
              id={`toggle-expand-hotel-btn-${hotel.id}`}
            >
              <span>{expanded ? 'Hide Collection' : 'Select Suites'}</span>
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 animate-bounce" />}
            </button>
          </div>

        </div>
      </div>

      {/* Accordion List for Rooms */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="border-t border-white/10 bg-black/45 p-6 lg:p-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-6 bg-[#c4a661] rounded-full" />
              <div>
                <h4 className="text-sm font-mono uppercase tracking-widest font-bold text-[#c4a661]">
                  Available Collections &amp; Special Offers
                </h4>
                <p className="text-xs text-white/45 mt-0.5">Rates include complimentary daily sanctuary access, elite speed Wi-Fi, and signature concierge turndown service.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rooms.map((room) => (
                <RoomCard 
                  key={room.id} 
                  room={room} 
                  onBook={(rm) => onBookRoom(rm, hotel)} 
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
