import React from 'react';
import { Filter, SlidersHorizontal, Star, DollarSign, Coffee, Smile, Compass, RotateCcw } from 'lucide-react';
import { AMENITIES_LIST, LOCATIONS_LIST } from '../data';
import { FilterState } from '../types';

interface FiltersProps {
  filterState: FilterState;
  setFilterState: (states: FilterState) => void;
  hotelCount: number;
}

export default function Filters({ filterState, setFilterState, hotelCount }: FiltersProps) {
  
  const handleLocationChange = (loc: string) => {
    setFilterState({
      ...filterState,
      location: loc === 'All Locations' ? '' : loc
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterState({
      ...filterState,
      maxPrice: Number(e.target.value)
    });
  };

  const handleRatingChange = (ratingVal: number | null) => {
    setFilterState({
      ...filterState,
      rating: ratingVal
    });
  };

  const handleAmenityToggle = (amenity: string) => {
    const isSelected = filterState.amenities.includes(amenity);
    const updated = isSelected 
      ? filterState.amenities.filter(item => item !== amenity)
      : [...filterState.amenities, amenity];
    
    setFilterState({
      ...filterState,
      amenities: updated
    });
  };

  const clearAllFilters = () => {
    setFilterState({
      search: '',
      location: '',
      minPrice: 0,
      maxPrice: 2000,
      rating: null,
      amenities: []
    });
  };

  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 p-6 shadow-xl sticky top-24" id="filters-sidebar">
      {/* Header title */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4.5 h-4.5 text-[#c4a661]" />
          <h2 className="text-sm font-mono uppercase tracking-wider font-bold text-white">
            Refine Collection
          </h2>
        </div>
        <span className="text-[11px] font-mono text-white/60 bg-white/5 px-2 py-1 rounded-md border border-white/5">
          {hotelCount} {hotelCount === 1 ? 'Sanctuary' : 'Sanctuaries'}
        </span>
      </div>

      {/* FILTER: LOCATION BUTTON GROUP (GRID / LIST) */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 font-mono">
          Global Destination
        </h3>
        <div className="grid grid-cols-2 gap-1.5">
          {LOCATIONS_LIST.map((loc) => {
            const isSelected = (!filterState.location && loc === 'All Locations') || (filterState.location === loc);
            return (
              <button
                key={loc}
                onClick={() => handleLocationChange(loc)}
                className={`text-left px-3 py-2 rounded-xl text-xs font-medium transition-all truncate border cursor-pointer ${
                  isSelected
                    ? 'bg-[#c4a661] border-[#c4a661] text-[#0a0a0a] font-bold'
                    : 'bg-white/5 hover:bg-white/10 border-white/5 text-white/70 hover:text-white'
                }`}
                id={`location-filter-${loc.replace(/[^a-zA-Z0-9]/g, '-')}`}
              >
                {loc}
              </button>
            );
          })}
        </div>
      </div>

      {/* FILTER: MAXIMUM PRICE PER NIGHT */}
      <div className="mb-6 border-t border-white/10 pt-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider font-mono">
            Maximum Budget
          </h3>
          <span className="text-xs font-mono font-bold text-[#c4a661] bg-[#c4a661]/10 px-2.5 py-1 rounded-md border border-[#c4a661]/25">
            ${filterState.maxPrice}+
          </span>
        </div>
        <input
          type="range"
          min="400"
          max="2000"
          step="50"
          value={filterState.maxPrice}
          onChange={handlePriceChange}
          className="w-full h-1.5 bg-white/10 active:bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#c4a661]"
          id="max-price-range-slider"
        />
        <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1.5">
          <span>Min: $400</span>
          <span>Max: $2000+</span>
        </div>
      </div>

      {/* FILTER: RATING STRENGTH */}
      <div className="mb-6 border-t border-white/10 pt-5">
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 font-mono">
          Minimum Luxury Rating
        </h3>
        <div className="flex flex-col gap-2">
          {[4.9, 4.8, 4.7].map((rate) => {
            const isSelected = filterState.rating === rate;
            return (
              <button
                key={rate}
                type="button"
                onClick={() => handleRatingChange(isSelected ? null : rate)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#c4a661] bg-[#c4a661]/10 text-[#c4a661] font-bold'
                    : 'border-white/10 hover:border-white/20 hover:bg-white/5 text-white/70'
                }`}
                id={`rating-filter-${rate}`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 fill-[#c4a661] text-[#c4a661]" />
                    ))}
                  </div>
                  <span className="font-mono pt-0.5 font-bold text-white">{rate} &amp; Above</span>
                </div>
                <span className="text-[10px] font-mono text-white/40">
                  {rate === 4.9 ? 'Exquisite Peak' : rate === 4.8 ? 'Superb' : 'Excellent'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FILTER: AMENITIES CHECKBOX LIST */}
      <div className="mb-6 border-t border-white/10 pt-5">
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 font-mono">
          Essential Conveniences
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {AMENITIES_LIST.map((amenity) => {
            const isChecked = filterState.amenities.includes(amenity);
            return (
              <button
                key={amenity}
                type="button"
                onClick={() => handleAmenityToggle(amenity)}
                className={`flex items-center justify-between text-left px-3 py-2 rounded-xl text-xs font-medium transition-all border cursor-pointer ${
                  isChecked
                    ? 'bg-white/5 text-white border-[#c4a661] font-bold'
                    : 'bg-transparent hover:bg-white/5 text-white/70 border-white/10'
                }`}
                id={`amenities-filter-${amenity.replace(/\s+/g, '-')}`}
              >
                <span>{amenity}</span>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                  isChecked 
                    ? 'bg-[#c4a661] border-[#c4a661] text-[#0a0a0a]' 
                    : 'border-white/20 bg-transparent'
                }`}>
                  {isChecked && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]"></span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CLEAR FILTERS */}
      {(filterState.search || filterState.location || filterState.rating || filterState.amenities.length > 0 || filterState.maxPrice < 2000) && (
        <button
          onClick={clearAllFilters}
          className="w-full flex items-center justify-center gap-2 bg-[#c4a661] hover:bg-[#d4bf8a] text-black font-bold text-xs py-3 rounded-xl uppercase tracking-wider font-mono shadow-md transition-colors cursor-pointer"
          id="clear-all-filters-btn"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Selection</span>
        </button>
      )}
    </div>
  );
}
