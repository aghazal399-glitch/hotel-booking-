import React from 'react';
import { Calendar, Trash2, Mail, Phone, ExternalLink, ShieldCheck, HelpCircle, Compass, Smile } from 'lucide-react';
import { Booking } from '../types';

interface BookingsHistoryProps {
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  onExploreClick: () => void;
}

export default function BookingsHistory({ bookings, onCancelBooking, onExploreClick }: BookingsHistoryProps) {
  return (
    <div className="bg-[#1a1a1a] rounded-3xl border border-white/10 p-6 sm:p-8 max-w-5xl mx-auto shadow-xs text-white" id="bookings-history-dashboard">
      
      {/* Dashboard title banner */}
      <div className="border-b border-white/5 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#c4a661] uppercase block font-bold">CLIENT DASHBOARD</span>
          <h2 className="text-2xl font-serif font-normal text-white mt-1">
            My Luxury Reservations
          </h2>
          <p className="text-xs text-white/60 mt-1 font-sans">
            Review, verify details, and manage check-in vouchers for your upcoming retreats.
          </p>
        </div>
        
        <div className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-3 w-fit">
          <ShieldCheck className="w-5 h-5 text-[#c4a661]" />
          <div>
            <span className="text-[9px] font-mono tracking-wider block text-white/40 uppercase font-bold">RESERVATION STATUS</span>
            <span className="text-xs font-bold text-white font-sans">ALL SECURED</span>
          </div>
        </div>
      </div>

      {bookings.length === 0 ? (
        /* Empty reservation State */
        <div className="text-center py-16 px-4 space-y-6 max-w-md mx-auto" id="no-reservations-wrapper">
          <div className="mx-auto w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-dashed border-white/10">
            <Calendar className="w-6 h-6 text-white/30 animate-pulse" />
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-normal text-white">
              No Reserved Journeys
            </h3>
            <p className="text-xs text-white/50 max-w-sm mx-auto mt-1.5 leading-relaxed font-sans">
              Your next unforgettable palace stay is waiting. Browse our elite sanctuaries to lock down your booking.
            </p>
          </div>

          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-2 bg-[#c4a661] hover:bg-[#d4bf8a] text-black text-xs font-bold font-mono tracking-widest uppercase px-6 py-3.5 rounded-xl transition-all cursor-pointer shadow-md mx-auto"
            id="explore-empty-cta"
          >
            <Compass className="w-4 h-4 text-black" />
            <span>Discover Destinations</span>
          </button>
        </div>
      ) : (
        /* List of simulated bookings */
        <div className="space-y-6" id="reservations-list-container">
          {bookings.map((booking) => (
            <div 
              key={booking.id}
              className="border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 hover:shadow-md transition-all bg-[#0a0a0a]"
              id={`booking-panel-${booking.id}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Left block cover snippet */}
                <div className="relative h-44 lg:h-auto lg:col-span-4 overflow-hidden">
                  <img 
                    src={booking.hotelImage} 
                    alt={booking.hotelName} 
                    className="w-full h-full object-cover text-white"
                  />
                  <div className="absolute inset-0 bg-black/60" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-[9px] font-mono text-[#c4a661] uppercase tracking-widest font-bold">CONFIRMED RETREAT</span>
                    <h3 className="text-base font-serif font-normal text-white leading-tight mt-0.5">
                      {booking.hotelName}
                    </h3>
                  </div>
                </div>

                {/* Right block voucher details */}
                <div className="p-6 lg:p-7 lg:col-span-8 flex flex-col justify-between">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-5 border-b border-white/5 pb-5">
                    
                    {/* Booking metadata */}
                    <div>
                      <span className="text-[10px] font-mono text-white/40 font-bold uppercase block">CONFIRMATION VOUCHER</span>
                      <span className="text-xs font-bold text-[#c4a661] font-mono tracking-wider block bg-[#1a1a1a] px-2 py-0.5 mt-1 border border-white/10 rounded-md w-fit">
                        {booking.id}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-white/40 font-bold uppercase block">ACCOMMODATION</span>
                      <span className="text-xs font-semibold text-white block mt-1">
                        {booking.roomName}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-white/40 font-bold uppercase block">TOTAL FARE PAID</span>
                      <span className="text-xs font-bold text-[#c4a661] block mt-1 font-mono">
                        ${booking.totalPrice} USD
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-white/40 font-bold uppercase block">CHECK-IN</span>
                      <span className="text-xs font-medium text-white/80 block mt-1 font-mono">
                        {booking.checkIn}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-white/40 font-bold uppercase block">CHECK-OUT</span>
                      <span className="text-xs font-medium text-white/80 block mt-1 font-mono">
                        {booking.checkOut}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-white/40 font-bold uppercase block">SUITE OCCUPANCY</span>
                      <span className="text-xs font-medium text-white/80 block mt-1">
                        {booking.guestsCount} travelers
                      </span>
                    </div>

                  </div>

                  {/* Primary guest details block */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex flex-col text-xs space-y-1 text-white/50">
                      <div className="flex items-center gap-1.5">
                        <Smile className="w-3.5 h-3.5 text-[#c4a661]" />
                        <span className="text-white font-semibold">{booking.guestName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-white/60">
                        <Mail className="w-3.5 h-3.5 text-white/30" />
                        <span>{booking.guestEmail}</span>
                        {booking.guestPhone && (
                          <>
                            <span className="text-white/20">|</span>
                            <Phone className="w-3.5 h-3.5 text-white/30" />
                            <span>{booking.guestPhone}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Cancel action */}
                    <button
                      onClick={() => onCancelBooking(booking.id)}
                      className="inline-flex items-center justify-center gap-1.5 bg-white/5 hover:bg-rose-500/10 hover:text-rose-400 text-white/50 px-4 py-2.5 rounded-xl text-xs font-semibold hover:border-rose-500/20 border border-transparent transition-all cursor-pointer"
                      id={`cancel-booking-btn-${booking.id}`}
                      title="Cancel this simulated stay"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Revoke Stay</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>
          ))}

          {/* Quick FAQ warning */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-3 text-left">
            <HelpCircle className="w-4.5 h-4.5 text-[#c4a661] mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <h5 className="text-xs font-bold text-white">Support Desk Assistance</h5>
              <p className="text-[11px] text-white/50 leading-relaxed font-sans">
                Need to amend dates or update dietary preferences? You must coordinate directly with our 24/7 client services team via the butler desk at <span className="font-mono text-white/80">concierge@loreandluxe.com</span>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
