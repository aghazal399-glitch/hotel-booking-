export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewsCount: number;
  description: string;
  image: string;
  priceFrom: number;
  amenities: string[];
  popularReason?: string;
}

export interface Room {
  id: string;
  hotelId: string;
  name: string;
  size: string; // e.g. "35 m²"
  price: number;
  maxGuests: number;
  image: string;
  amenities: string[];
  bedType: string;
  breakfastIncluded: boolean;
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  roomId: string;
  roomName: string;
  hotelImage: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  totalPrice: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface FilterState {
  search: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  rating: number | null;
  amenities: string[];
}
