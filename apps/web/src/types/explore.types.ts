export type ImageType = {
  id: string;
  image_url: string;
};

export type Facility = {
  id: string;
  name: string;
};

export interface SearchFilters {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  category: string;
  sortBy: string;
  page: number;
}

export interface LocationSuggestion {
  id: string;
  name: string;
  type: 'city' | 'area' | 'property';
}

export type RoomData = {
  id: string;
  title: string;
  maxGuests: number;
  price: number;
  photo: File | null;
};

export type Property = {
  id: string;
  name: string;
  city: string;
  lowest_price: number; 

  images: ImageType[]; 

  facilities: {
    facility: Facility;
  }[];

  rating: number | null;
  reviews: number | null;

  description: string;
  address: string;
  latitude: number;
  longitude: number;
  category: 'VILLA' | 'APARTMENT' | 'GUEST_HOUSE';
  rooms: RoomData[];
};
