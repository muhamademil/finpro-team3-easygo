export type Destination = {
  id: number;
  name: string;
  image: string;
};

export interface Property {
  id: number;
  name: string;
  address: string;
  images: ImageType[];
  rating: number | null;
  reviews: number;
  lowest_price: number;
  category: 'Villa' | 'Apartment' | 'House';
}

interface ImageType {
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
  basePrice: number;
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

export type RoomInput = {
  name: string;
  base_price: number;
  max_guest: number;
};

export type CreatePropertyInput = {
  name: string;
  description: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  category: 'VILLA' | 'APARTMENT' | 'GUEST_HOUSE';
  rooms: RoomInput[];
  facilityIds: string[];
  imageUrls: string[];
};
