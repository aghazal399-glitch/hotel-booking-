import React, { useState, useEffect } from 'react';
import { X, Calendar, Wallet, User, Mail, Phone, MessageSquare, CheckCircle2, Ticket, Printer, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Hotel, Room, Booking } from '../types';

interface BookingModalProps {
  room: Room;
  hotel: Hotel;
  isOpen: boolean;
  onClose: () => void;
  onSubmitBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
}

export default function BookingModal({ room, hotel, isOpen, onClose, onSubmitBooking }: BookingModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  // Form State
  const [checkIn, setCheckIn] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [checkOut, setCheckOut] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 3); // 3 nights by default
    return tomorrow.toISOString().split('T')[0];
  });
  const [guestsCount, setGuestsCount] = useState(2);
  const [guestName, setGuestName] = useState('Alistair Loxley');
  const [guestEmail, setGuestEmail] = useState('alistair.loxley@exclusive.com');
  const [guestPhone, setGuestPhone] = useState('+1 (555) 389-1090');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Card mock state
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCVV, setCardCVV] = useState('288');

  // Multi-night calculation
  const [nights, setNights] = useState(3);

  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays || 1);
    }
  }, [checkIn, checkOut]);

  // Calculations
  const roomCost = room.price * nights;
  const resortTax = Math.round(roomCost * 0.08); // 8% local luxury tax
  const serviceCharge = Math.round(roomCost * 0.04); // 4% wellness services charge
  const totalPrice = roomCost + resortTax + serviceCharge;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create random receipt details
    const confirmCode = `LUX-${Math.floor(100000 + Math.random() * 900000)}`;
    const mockCreatedBooking: Booking = {
      id: confirmCode,
      hotelId: hotel.id,
      hotelName: hotel.name,
      roomId: room.id,
      roomName: room.name,
      hotelImage: hotel.image,
      checkIn,
      checkOut,
      guestsCount,
      totalPrice,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests,
      status: 'confirmed',
      createdAt: new Date().toLocaleDateString()
    };

    setCreatedBooking(mockCreatedBooking);
    onSubmitBooking(mockCreatedBooking);
    setStep('success');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" id="checkout-modal-overlay">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Underlay mask */}
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        />

        {/* Vertical alignment helper */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal Main Box */}
        <div className="inline-block align-bottom bg-[#1a1a1a] text-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-white/10" id="modal-container-box">
          
          {/* Header Close button */}
          <div className="absolute top-5 right-5 z-20">
            <button
              onClick={onClose}
              className="p-2 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white rounded-full transition-colors cursor-pointer"
              id="close-booking-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {step === 'form' ? (
              <motion.div 
                key="booking-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-12"
              >
                
                {/* Left side Form Inputs */}
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 md:col-span-7 space-y-5 border-r border-white/5">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#c4a661] uppercase block font-bold">RESERVATION OFFICE</span>
                    <h2 className="text-xl sm:text-2xl font-serif font-normal text-white mt-0.5">
                      Confirm Sanctuary Stay
                    </h2>
                  </div>

                  {/* Date fields row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-white/40 font-bold">Check-In</label>
                      <input 
                        type="date" 
                        required
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-[#0a0a0a] px-3.5 py-2.5 rounded-xl text-xs font-semibold font-sans text-white border border-white/10 focus:outline-none focus:border-[#c4a661] focus:ring-1 focus:ring-[#c4a661] transition-all cursor-pointer [color-scheme:dark]"
                        id="form-checkin-input"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-white/40 font-bold">Check-Out</label>
                      <input 
                        type="date" 
                        required
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        min={checkIn || new Date().toISOString().split('T')[0]}
                        className="w-full bg-[#0a0a0a] px-3.5 py-2.5 rounded-xl text-xs font-semibold font-sans text-white border border-white/10 focus:outline-none focus:border-[#c4a661] focus:ring-1 focus:ring-[#c4a661] transition-all cursor-pointer [color-scheme:dark]"
                        id="form-checkout-input"
                      />
                    </div>
                  </div>

                  {/* Standard details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-white/40 font-bold">Full Guest Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 w-3.5 h-3.5 text-white/40" />
                        <input 
                          type="text" 
                          required
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="Your complete name"
                          className="w-full bg-[#0a0a0a] pl-9 pr-3.5 py-2.5 rounded-xl text-xs font-semibold font-sans text-white border border-white/10 focus:outline-none focus:border-[#c4a661] focus:ring-1 focus:ring-[#c4a661] transition-all"
                          id="form-guestname-input"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-white/40 font-bold">Contact Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 w-3.5 h-3.5 text-white/40" />
                        <input 
                          type="email" 
                          required
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          placeholder="for booking confirmation"
                          className="w-full bg-[#0a0a0a] pl-9 pr-3.5 py-2.5 rounded-xl text-xs font-semibold font-sans text-white border border-white/10 focus:outline-none focus:border-[#c4a661] focus:ring-1 focus:ring-[#c4a661] transition-all"
                          id="form-guestemail-input"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-white/40 font-bold">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3.5 w-3.5 h-3.5 text-white/40" />
                        <input 
                          type="text" 
                          required
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-[#0a0a0a] pl-9 pr-3.5 py-2.5 rounded-xl text-xs font-semibold font-sans text-white border border-white/10 focus:outline-none focus:border-[#c4a661] focus:ring-1 focus:ring-[#c4a661] transition-all"
                          id="form-guestphone-input"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-white/40 font-bold">Total Travelers</label>
                      <select 
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(Number(e.target.value))}
                        className="w-full bg-[#0a0a0a] px-3.5 py-2.5 rounded-xl text-xs font-semibold font-sans text-white border border-white/10 focus:outline-none focus:border-[#c4a661] focus:ring-1 focus:ring-[#c4a661] transition-all cursor-pointer"
                        id="form-guestscount-select"
                      >
                        {[1, 2, 3, 4].map(num => (
                          <option key={num} value={num} className="bg-[#1a1a1a] text-white">{num} {num === 1 ? 'Adult' : 'Guests (Adults/Children)'}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Special requests comments */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-white/40 font-bold">Requests &amp; Preferences (Optional)</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3.5 w-3.5 h-3.5 text-white/40" />
                      <textarea 
                        rows={2}
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Dietary choices, room near elevator, special honeymoon setup..."
                        className="w-full bg-[#0a0a0a] pl-9 pr-3.5 py-2.5 rounded-xl text-xs font-semibold font-sans text-white border border-white/10 focus:outline-none focus:border-[#c4a661] focus:ring-1 focus:ring-[#c4a661] transition-all resize-none"
                        id="form-requests-textarea"
                      />
                    </div>
                  </div>

                  {/* Premium mock secure payment section */}
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#c4a661] font-bold flex items-center gap-1.5">
                        <Wallet className="w-3.5 h-3.5 text-[#c4a661]" />
                        Secure Payment Authorization
                      </span>
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md font-bold">
                        256-BIT SSL SECURE
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2 flex flex-col gap-1">
                        <span className="text-[9px] font-mono text-white/40 uppercase">Card number</span>
                        <input 
                          type="text" 
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="bg-black/40 px-3 py-2 rounded-lg text-xs font-mono font-semibold tracking-wide border border-white/10 text-white focus:outline-none focus:border-[#c4a661]"
                          id="form-card-number"
                        />
                      </div>
                      <div className="flex gap-2">
                        <div className="flex flex-col gap-1 w-1/2">
                          <span className="text-[9px] font-mono text-white/40 uppercase">Expiry</span>
                          <input 
                            type="text" 
                            required
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="bg-black/40 px-2.5 py-2 rounded-lg text-xs font-mono text-center font-bold tracking-wide border border-white/10 text-white focus:outline-none focus:border-[#c4a661]"
                            id="form-card-expiry"
                          />
                        </div>
                        <div className="flex flex-col gap-1 w-1/2">
                          <span className="text-[9px] font-mono text-white/40 uppercase">CVV</span>
                          <input 
                            type="password" 
                            required
                            maxLength={3}
                            value={cardCVV}
                            onChange={(e) => setCardCVV(e.target.value)}
                            className="bg-black/40 px-2.5 py-2 rounded-lg text-xs font-mono text-center font-bold tracking-wide border border-white/10 text-white focus:outline-none focus:border-[#c4a661]"
                            id="form-card-cvv"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submission CTA */}
                  <button 
                    type="submit"
                    className="w-full bg-[#c4a661] hover:bg-[#d4bf8a] text-black py-4 rounded-xl font-sans font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                    id="submit-booking-form-btn"
                  >
                    <span>Authorize &amp; Confirm Stay &mdash; ${totalPrice}</span>
                  </button>
                </form>

                {/* Right side Invoice Summary */}
                <div className="p-6 sm:p-8 md:col-span-12 lg:col-span-5 bg-black/35 space-y-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/5">
                  <div className="space-y-4">
                    {/* Hotel Header photo */}
                    <div className="relative h-32 w-full rounded-2xl overflow-hidden shadow-sm border border-white/10">
                      <img 
                        src={hotel.image} 
                        alt={hotel.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-neutral-900/40" />
                      <div className="absolute bottom-3 left-3 text-white">
                        <span className="text-[9px] font-mono tracking-widest text-[#c4a661] uppercase font-bold">SANCTUARY</span>
                        <h3 className="text-sm font-serif font-semibold text-white leading-none mt-1">
                          {hotel.name}
                        </h3>
                      </div>
                    </div>

                    {/* Suite Name details */}
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-white/40 block font-bold">SELECTED RETREAT SUITE</span>
                      <h4 className="text-sm font-bold text-white mt-0.5">{room.name}</h4>
                      <p className="text-xs text-white/65 mt-0.5 font-mono">{room.size} | {room.bedType}</p>
                    </div>

                    <div className="border-t border-dashed border-white/10 pt-4 space-y-3">
                      <h5 className="text-[10px] font-mono font-bold text-white/45 uppercase tracking-widest">Rate Calculation Details</h5>
                      
                      {/* Price Rows */}
                      <div className="flex justify-between text-xs text-white/70">
                        <span>Nightly Base Fee ({nights} night{nights > 1 ? 's' : ''})</span>
                        <span className="font-mono font-medium">${room.price} &times; {nights}</span>
                      </div>

                      <div className="flex justify-between text-xs text-white/70">
                        <span>Resort Wellness Fee (8%)</span>
                        <span className="font-mono font-medium">${resortTax}</span>
                      </div>

                      <div className="flex justify-between text-xs text-white/70">
                        <span>Signature Concierge Service (4%)</span>
                        <span className="font-mono font-medium">${serviceCharge}</span>
                      </div>

                      {/* Line Separator */}
                      <div className="border-t border-white/10 my-2" />

                      {/* Total cost */}
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs font-semibold text-white/75">Total Price (inclusive)</span>
                        <div className="text-right">
                          <span className="text-lg font-serif font-bold text-[#c4a661]">${totalPrice}</span>
                          <span className="text-[10px] font-mono text-white/40 block mt-0.5">USD ($)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trust warning */}
                  <div className="bg-white/5 rounded-xl p-3.5 flex gap-2.5 items-start border border-white/5">
                    <ShieldAlert className="w-4 h-4 text-[#c4a661] mt-0.5 flex-shrink-0" />
                    <p className="text-[10.5px] text-white/50 leading-snug">
                      This is a highly secure simulated booking engine. No actual credit card transactions or fees will be processed.
                    </p>
                  </div>

                </div>

              </motion.div>
            ) : (
              // Success Screen with print receipt style
              <motion.div 
                key="booking-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="p-8 space-y-6 text-center max-w-lg mx-auto"
              >
                <div className="flex flex-col items-center gap-1.5">
                  <div className="p-3 bg-[#c4a661]/10 rounded-full text-[#c4a661] shadow-sm animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#c4a661] mt-2">Voyage Confirmed</span>
                  <h2 className="text-2xl font-serif font-normal text-white">
                    Your luxury experience is ready!
                  </h2>
                  <p className="text-sm text-white/60 max-w-sm mt-1">
                    A boutique booking voucher has been issued and dispatched to your email address: <strong className="text-white">{guestEmail}</strong>.
                  </p>
                </div>

                {/* Printable receipt card */}
                <div className="bg-black/35 border border-white/10 rounded-2xl p-5 text-left space-y-4 font-sans shadow-inner">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <div className="flex items-center gap-1">
                      <Ticket className="w-3.5 h-3.5 text-[#c4a661]" />
                      <span className="text-xs font-mono font-bold uppercase text-white/85">Digital Voucher</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#c4a661] bg-[#1a1a1a] border border-white/10 px-2.5 py-1 rounded-md">
                      {createdBooking?.id}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-white/40 font-bold block">SANCTUARY</span>
                      <span className="font-bold text-white">{createdBooking?.hotelName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-white/40 font-bold block">SUITE</span>
                      <span className="font-semibold text-white">{createdBooking?.roomName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-white/40 font-bold block">CHECK-IN</span>
                      <span className="font-mono text-white/80 font-medium">{createdBooking?.checkIn}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-white/40 font-bold block">CHECK-OUT</span>
                      <span className="font-mono text-white/80 font-medium">{createdBooking?.checkOut}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-white/40 font-bold block">PRIMARY TRAVELER</span>
                      <span className="font-semibold text-white">{createdBooking?.guestName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-white/40 font-bold block">PAID TOTAL</span>
                      <span className="font-bold text-[#c4a661] text-sm">${createdBooking?.totalPrice}</span>
                    </div>
                  </div>

                  {createdBooking?.specialRequests && (
                    <div className="border-t border-white/10 pt-3">
                      <span className="text-[9px] uppercase font-mono text-white/40 font-bold block">SPECIAL INSTRUCTIONS</span>
                      <span className="text-xs italic text-white/70 block mt-0.5">&ldquo;{createdBooking.specialRequests}&rdquo;</span>
                    </div>
                  )}

                  {/* Stamp */}
                  <div className="flex justify-center border-t border-white/10 pt-3">
                    <span className="text-[10px] font-mono tracking-widest text-[#c4a661] font-bold border border-dashed border-[#c4a661]/40 px-3.5 py-1 rounded-md select-none transform rotate-1 inline-block uppercase bg-[#c4a661]/5">
                      L&apos;AVENIR VERIFIED SANCTUARY
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 bg-[#c4a661] hover:bg-[#d4bf8a] text-black font-bold text-xs py-3.5 rounded-xl uppercase tracking-wider font-mono shadow-md cursor-pointer transition-all"
                  >
                    Return to Explore
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
