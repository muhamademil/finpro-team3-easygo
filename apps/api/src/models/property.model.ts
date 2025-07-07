export interface PropertyQueryParams {
  city?: string;
  category?: 'APARTMENT' | 'VILLA' | 'GUEST_HOUSE';
  type?: 'random' | 'recommendation';
  sortBy?: 'price' | 'popularity';
  orderBy?: 'asc' | 'desc';
  limit?: string;
  page?: string;
}

export interface RoomInput {
  name: string;
  base_price: number;
  max_guest: number;
  imageUrl?: string;
}

export interface CreatePropertyInput {
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
}

export type UpdatePropertyInput = Partial<CreatePropertyInput>;
