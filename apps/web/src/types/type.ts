export type Destination = {
  id: number;
  name: string;
  image: string;
};

export type RoomData = {
  id: string; // ID unik untuk mapping di React
  title: string;
  maxGuests: number;
  price: number;
  photo: File | null;
};

export interface Property {
  id: string;
  name: string;
  address: string;
  description: string;
  city: string;
  latitude: number;
  location: string;
  longitude: number;
  images: ImageType[];
  rating: number | null;
  reviews: number;
  lowest_price: number;
  category: 'Villa' | 'Apartment' | 'House';
  rooms: RoomData[];
  facilities: {
    // Struktur ini adalah hasil dari relasi many-to-many di Prisma
    facility: Facility;
  }[];
}

interface ImageType {
  id: number;
  image_url: string;
}

export type Category = {
  id: number;
  name: string;
  image: string;
  href: string;
};

export interface Propertyadd {
  id: string;
  name: string;
  basePrice?: number;
}

export interface PricingData {
  isActive: boolean;
  adjustmentType: string;
  nominalAmount: string;
  percentageAmount: string;
}

export interface CalendarDay {
  date: number;
  fullDate: Date;
  dateString: string;
  price: number;
  isSelected: boolean;
  isPast: boolean;
  isToday: boolean;
  isUnavailable: boolean;
  isDisabled: boolean;
  hasModification: boolean;
  savedData?: PricingData;
}

export interface NavigationItem {
  name: string;
  active: boolean;
}

export interface PercentageOption {
  value: string;
  label: string;
}

export type Reply = {
  author: string;
  text: string;
  createdAt: string;
};

export type Review = {
  id: number;
  authorName: string;
  authorImageUrl: string;
  property: {
    name: string;
  };
  stayDate: {
    start: string;
    end: string;
  };
  rating: number;
  createdAt: string;
  text: string;
  reply: Reply | null;
};

// Status untuk alur pembayaran
type PaymentStatus =
  | 'pending_payment'
  | 'pending_confirmation'
  | 'confirmed'
  | 'rejected';
// Status untuk alur penyewaan ruangan
type RoomStatus = 'completed' | 'cancelled';

export type BookingStatus = PaymentStatus | RoomStatus;

export type Booking = {
  id: string; // misal: #42311
  bookedBy: {
    name: string;
    phone: string;
    email: string;
    imageUrl: string;
  };
  schedule: {
    start: Date;
    end: Date;
  };
  payment: {
    date: Date;
    method: 'manual' | 'midtrans';
    proofUrl?: string; // Opsional, hanya untuk metode manual
  };
  status: BookingStatus;
};

// export type CreatePropertyInput = {
//   name: string;
//   description: string;
//   address: string;
//   city: string;
//   latitude: number;
//   longitude: number;
//   category: 'VILLA' | 'APARTMENT' | 'GUEST_HOUSE';
//   rooms: RoomInput[];
//   facilityIds: string[];
//   imageUrls: string[];
// };

export type Facility = {
  id: string;
  name: string;
};

export type Room = {
  id: string;
  title: string;
  maxGuests: number;
  price: number;
  photo: string | null;
};

export type PropertyData = {
  id: string;
  name: string;
  description: string;
  location: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  lowest_price: number;
  category: string;
  images: ImageType[];
  rooms: Room[];
  facilities: { facility: Facility }[];
  rating?: number | null;
  reviews?: number | null;
};

// Tipe untuk satu kamar yang dikirim saat membuat/update properti
export type RoomInput = {
  name: string;
  base_price: number;
  max_guest: number;
  imageUrl?: string;
};

// Tipe untuk payload saat MEMBUAT properti baru
export type CreatePropertyInput = {
  name: string;
  description: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  category: 'VILLA' | 'APARTMENT' | 'GUEST_HOUSE';
  rooms: RoomInput[];
  facilityIds: string[]; // Hanya mengirim array ID fasilitas
  imageUrls: string[]; // Hanya mengirim array URL gambar
};

// Tipe untuk payload saat MENGUPDATE properti
// Menggunakan Partial<T> untuk membuat semua field menjadi opsional
export type UpdatePropertyInput = Partial<CreatePropertyInput>;
