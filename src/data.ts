import { Hotel, Room } from './types';

export const HOTELS: Hotel[] = [
  {
    id: '1',
    name: 'Amandari Resort',
    location: 'Bali, Indonesia',
    rating: 4.9,
    reviewsCount: 324,
    description: 'Designed as a traditional Balinese village, Amandari is framed by rice terraces and the sacred Ayung River valley. Experience ultimate serenity with private plunge pools, open-air pavilion suites, and immersive spiritual tours.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    priceFrom: 450,
    amenities: ['Pool', 'Spa', 'Free WiFi', 'Restaurant', 'Gym', 'Airport Shuttle'],
    popularReason: 'Stunning jungle view & infinity pool'
  },
  {
    id: '2',
    name: 'The Ritz-Carlton Kyoto',
    location: 'Kyoto, Japan',
    rating: 4.8,
    reviewsCount: 218,
    description: 'Stretched serenely along the Kamogawa River, this luxury hotel blends Kyoto\'s rich culture with legendary Ritz-Carlton service. Features elegant Zen-inspired design, custom shoji screens, and world-class culinary experiences.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    priceFrom: 650,
    amenities: ['Spa', 'Free WiFi', 'Restaurant', 'Gym', 'Indoor Pool', 'Bar'],
    popularReason: 'Perfect river view & Michelin-starred dining'
  },
  {
    id: '3',
    name: 'Hotel Plaza Athénée',
    location: 'Paris, France',
    rating: 4.9,
    reviewsCount: 412,
    description: 'Located on the prestigious Avenue Montaigne, home of French haute couture, this legendary palace-status hotel features iconic red awnings, classical French decor, and direct views of the Eiffel Tower.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    priceFrom: 920,
    amenities: ['Free WiFi', 'Restaurant', 'Gym', 'Spa', 'Pet Friendly', 'Bar', 'Room Service'],
    popularReason: 'Eiffel Tower views & premium luxury shopping'
  },
  {
    id: '4',
    name: 'The Plaza Hotel',
    location: 'New York, USA',
    rating: 4.7,
    reviewsCount: 815,
    description: 'An iconic landmark next to Central Park, offering modern luxury with prestigious historic legacy. From royalty to blockbusters, stay at the crown jewel of classic New York style, featuring white-glove service and the legendary Palm Court.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    priceFrom: 580,
    amenities: ['Gym', 'Free WiFi', 'Restaurant', 'Bar', 'Spa', 'Room Service', 'Valet Parking'],
    popularReason: 'Steps from Central Park & Fifth Avenue'
  },
  {
    id: '5',
    name: 'Marina Bay Sands',
    location: 'Singapore',
    rating: 4.8,
    reviewsCount: 1245,
    description: 'Rising above the Marina Bay, this breathtaking ultra-modern architectural marvel features the world\'s largest rooftop infinity pool, a sprawling observation deck, dynamic light shows, and dozens of Michelin-tier signature restaurants.',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
    priceFrom: 520,
    amenities: ['Pool', 'Free WiFi', 'Restaurant', 'Gym', 'Casino', 'Bar', 'Airport Shuttle'],
    popularReason: 'World-famous infinity pool & skyline'
  },
  {
    id: '6',
    name: 'Grand Hotel Tremezzo',
    location: 'Lake Como, Italy',
    rating: 4.9,
    reviewsCount: 286,
    description: 'An authentic Art Nouveau palace offering spectacular views of Bellagio and the Grigna mountains. Features three pools (including a water-on-the-water floating pool), a private sandy beach, and lush centenary gardens.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    priceFrom: 850,
    amenities: ['Pool', 'Spa', 'Free WiFi', 'Restaurant', 'Bar', 'Private Beach', 'Gym'],
    popularReason: 'Floating lake-pool & boutique Italian grace'
  }
];

export const ROOMS: Room[] = [
  // Amandari Resort Rooms
  {
    id: '1-1',
    hotelId: '1',
    name: 'Garden Pavilion Suite',
    size: '110 m²',
    price: 450,
    maxGuests: 2,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    bedType: 'King bed',
    breakfastIncluded: true,
    amenities: ['Private Garden', 'Outdoor Bathtub', 'Daily Yoga classes', 'Espresso Machine']
  },
  {
    id: '1-2',
    hotelId: '1',
    name: 'Valley Pool Suite',
    size: '150 m²',
    price: 680,
    maxGuests: 3,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    bedType: 'King bed + Daybed',
    breakfastIncluded: true,
    amenities: ['Private Plunge Pool', 'Ayung River View', 'Butler Service', 'Outdoor Veranda']
  },

  // Ritz-Carlton Kyoto Rooms
  {
    id: '2-1',
    hotelId: '2',
    name: 'Deluxe Kamogawa River View Room',
    size: '55 m²',
    price: 650,
    maxGuests: 2,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    bedType: 'King bed',
    breakfastIncluded: false,
    amenities: ['River views', 'Shoji screens', 'Kyoto Soap Amenities', 'Turndown Amenity']
  },
  {
    id: '2-2',
    hotelId: '2',
    name: 'Kamogawa Suite with Zen Garden',
    size: '95 m²',
    price: 1100,
    maxGuests: 3,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    bedType: 'King bed + Futon option',
    breakfastIncluded: true,
    amenities: ['Private dry garden', 'Sake tasting set', 'Dedicated Concierge', 'Spacious cedarwood bath']
  },

  // Hotel Plaza Athenee Rooms
  {
    id: '3-1',
    hotelId: '3',
    name: 'Deluxe Room with Parisian Courtyard View',
    size: '40 m²',
    price: 920,
    maxGuests: 2,
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80',
    bedType: 'Queen bed',
    breakfastIncluded: false,
    amenities: ['Courtyard view', 'Silk drapes', 'Guerlain bath details', 'iPad control system']
  },
  {
    id: '3-2',
    hotelId: '3',
    name: 'Eiffel Tower View King Suite',
    size: '80 m²',
    price: 1650,
    maxGuests: 2,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    bedType: 'King bed',
    breakfastIncluded: true,
    amenities: ['Eiffel Tower view', 'Champagne welcome', 'Private dressing room', 'Luxury marble spa bath']
  },

  // The Plaza Hotel Rooms
  {
    id: '4-1',
    hotelId: '4',
    name: 'Deluxe Plaza Room',
    size: '45 m²',
    price: 580,
    maxGuests: 2,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    bedType: 'King bed',
    breakfastIncluded: false,
    amenities: ['Signature 24-karat gold fixtures', 'Sherry welcome', 'Plaza bathrobes', 'In-room iPads']
  },
  {
    id: '4-2',
    hotelId: '4',
    name: 'Edwardian Suite Central Park Side',
    size: '85 m²',
    price: 950,
    maxGuests: 3,
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
    bedType: 'King bed + Sofa bed',
    breakfastIncluded: true,
    amenities: ['Park View', 'Separate Parlor Room', 'Plaza Butler Service', 'Wet bar']
  },

  // Marina Bay Sands Rooms
  {
    id: '5-1',
    hotelId: '5',
    name: 'Sands Premier Room Harbor View',
    size: '47 m²',
    price: 520,
    maxGuests: 3,
    image: 'https://images.unsplash.com/photo-1611891487122-2075b96244e1?auto=format&fit=crop&w=800&q=80',
    bedType: 'King bed or 2 Twins',
    breakfastIncluded: false,
    amenities: ['Direct Infinity Pool Access', 'Floor-to-ceiling windows', 'Garden by the Bay views']
  },
  {
    id: '5-2',
    hotelId: '5',
    name: 'Sands Heritage Suite',
    size: '120 m²',
    price: 890,
    maxGuests: 4,
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
    bedType: '2 King beds',
    breakfastIncluded: true,
    amenities: ['Exclusive Club Lounge Access', 'Billard Table / Media room', 'Complimentary afternoon tea']
  },

  // Grand Hotel Tremezzo Rooms
  {
    id: '6-1',
    hotelId: '6',
    name: 'Park View Deluxe Room',
    size: '35 m²',
    price: 850,
    maxGuests: 2,
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80',
    bedType: 'King bed',
    breakfastIncluded: true,
    amenities: ['Century park view', 'Classic velvet sofas', 'Aqua Como toiletries', 'Balcony']
  },
  {
    id: '6-2',
    hotelId: '6',
    name: 'Rooftop Suite Lake View & Jacuzzi',
    size: '75 m²',
    price: 1800,
    maxGuests: 2,
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80',
    bedType: 'King bed',
    breakfastIncluded: true,
    amenities: ['Private rooftop heated jacuzzi', 'Panoramic lake balcony', 'Dedicated butler', 'Vintage champagne on ice']
  }
];

export const AMENITIES_LIST = [
  'Pool',
  'Spa',
  'Free WiFi',
  'Restaurant',
  'Gym',
  'Airport Shuttle',
  'Bar',
  'Indoor Pool',
  'Room Service',
  'Valet Parking',
  'Private Beach'
];

export const LOCATIONS_LIST = [
  'All Locations',
  'Bali, Indonesia',
  'Kyoto, Japan',
  'Paris, France',
  'New York, USA',
  'Singapore',
  'Lake Como, Italy'
];
