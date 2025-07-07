export type ImageType = {
  id: string;
  image_url: string;
};

// Tipe untuk satu objek fasilitas yang diterima dari API
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
  id: string; // ID unik untuk mapping di React
  title: string;
  maxGuests: number;
  price: number;
  photo: File | null;
};

export type Property = {
  id: string;
  name: string;
  city: string; // Digunakan untuk menampilkan lokasi di kartu
  lowest_price: number; // Harga terendah dari semua kamar di properti ini

  // Relasi yang diperkaya oleh Prisma `include` dari backend
  images: ImageType[]; // Array dari objek gambar

  facilities: {
    // Struktur ini adalah hasil dari relasi many-to-many di Prisma
    facility: Facility;
  }[];

  // Field yang bisa jadi null jika properti masih baru
  rating: number | null;
  reviews: number | null;

  // Field lain yang mungkin Anda butuhkan dari backend
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  category: 'VILLA' | 'APARTMENT' | 'GUEST_HOUSE';
  rooms: RoomData[]; // Tipe 'any' untuk sementara, bisa disempurnakan nanti
};
