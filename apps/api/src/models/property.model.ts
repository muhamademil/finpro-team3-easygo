export interface PropertyQueryParams {
  city?: string;
  category?: 'APARTMENT' | 'VILLA' | 'GUEST_HOUSE';
  type?: 'random' | 'recommendation';
  sortBy?: 'price' | 'popularity';
  orderBy?: 'asc' | 'desc';
  limit?: string;
  page?: string;
}
