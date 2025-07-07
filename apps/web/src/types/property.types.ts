// Tipe untuk satu gambar dari database
export type ImageType = {
  id: string;
  image_url: string;
};

// Tipe untuk satu fasilitas dari database
export type Facility = {
  id: string;
  name: string;
};

// Tipe untuk satu kamar dari database
export type Room = {
  id: string;
  name: string;
  base_price: number;
  max_guest: number;
  // Nanti bisa ditambahkan relasi gambar kamar di sini
};

// Tipe utama untuk data Properti yang diterima dari API
export type Property = {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  lowest_price: number;
  category: 'VILLA' | 'APARTMENT' | 'GUEST_HOUSE';

  // Relasi yang diperkaya oleh Prisma `include`
  images: ImageType[];
  rooms: Room[];
  facilities: {
    facility: Facility; // Struktur hasil dari relasi many-to-many
  }[];

  // Field yang bisa jadi null
  rating: number | null;
  reviews: number | null;
};
