// Tipe untuk data host yang diterima dari API
export type Host = {
  name: string | null;
  photo_url: string | null;
};

// Tipe untuk data tenant yang diterima dari API
export type Tenant = {
  user: Host;
};

// Tipe untuk gambar dari API
export type ImageType = {
  id: string;
  image_url: string;
};

// Tipe untuk fasilitas dari API
export type Facility = {
  id: string;
  name: string;
};

// Tipe untuk kamar dari API
export type Room = {
  id: string;
  name: string;
  base_price: number;
  max_guest: number;
};

// Tipe utama untuk data Properti lengkap dari API
export type Property = {
  id: string;
  name: string;
  location: string;
  city: string;
  description: string;
  lowest_price: number;
  images: ImageType[];
  rooms: Room[];
  facilities: { facility: Facility }[];
  tenant: {
    user: {
      name: string;
      photo_url: string;
    };
  } | null;
  rating: number | null;
  reviews: number | null;
  //   category: 'VILLA' | 'APARTMENT' | 'GUEST_HOUSE';
  //   address: string;
  latitude: number;
  longitude: number;
};

// Tipe untuk detail booking yang dikelola di sisi klien
export type BookingDetails = {
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  selectedRoom: Room | null;
};
