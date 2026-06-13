import React from 'react';
import { Maximize, Users, Bed, Coffee, Check, ShieldCheck, Tag } from 'lucide-react';
import { Room } from '../types';

interface RoomCardProps {
  key?: string | number;
  room: Room;
  onBook: (room: Room) => void;
}

export default function RoomCard({ room, onBook }: RoomCardProps) {
  return (
    <div 
      className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-[#c4a661]/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
      id={`roombox-${room.id}`}
    >
      {/* Visual cover & Price ribbon */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden">
        <img 
          src={room.image} 
          alt={room.name} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        {/* Cost Pill */}
        <div className="absolute bottom-3 left-3 bg-[#1a1a1a]/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-baseline gap-1 shadow-sm">
          <span className="text-[10px] font-mono font-bold text-white/40 uppercase">From</span>
          <span className="text-base font-sans font-extrabold text-white">${room.price}</span>
          <span className="text-[10.5px] font-mono text-white/45">/night</span>
        </div>

        {/* Space sizing pill */}
        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 text-white border border-white/5">
          <Maximize className="w-3 h-3 text-[#c4a661]" />
          <span className="text-[10.5px] font-mono font-semibold">{room.size}</span>
        </div>
      </div>

      {/* Content wrapper */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Room Title */}
          <h4 className="text-sm font-sans font-bold text-white leading-snug tracking-tight mb-2">
            {room.name}
          </h4>

          {/* Quick Specifications */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-4 text-[11px] text-white/50 border-b border-dashed border-white/10 pb-3">
            <div className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-[#c4a661]" />
              <span>{room.bedType}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#c4a661]" />
              <span>Max: {room.maxGuests} guests</span>
            </div>

            {room.breakfastIncluded && (
              <div className="flex items-center gap-1 text-[#c4a661] font-semibold bg-[#c4a661]/10 px-1.5 py-0.5 rounded-sm">
                <Coffee className="w-3 h-3 text-[#c4a661]" />
                <span>Breakfast Included</span>
              </div>
            )}
          </div>

          {/* Custom Suite Amenities */}
          <h5 className="text-[10px] font-mono font-bold text-white/45 uppercase tracking-widest mb-1.5">
            Suite Conveniences
          </h5>
          <div className="grid grid-cols-2 gap-1.5 mb-5">
            {room.amenities.map((amenity, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[11px] text-white/60">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c4a661] flex-shrink-0" />
                <span className="truncate">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={() => onBook(room)}
            className="w-full bg-[#c4a661]/10 hover:bg-[#c4a661]/20 active:bg-[#c4a661]/35 border border-[#c4a661]/30 text-[#c4a661] font-sans font-bold text-xs py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            id={`book-room-btn-${room.id}`}
          >
            <ShieldCheck className="w-4 h-4 text-[#c4a661]" />
            <span>Select &amp; Book Suite</span>
          </button>
        </div>
      </div>
    </div>
  );
}
