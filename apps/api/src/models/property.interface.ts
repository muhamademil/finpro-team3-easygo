export interface CreatePropertyInput {
  name: string
  description: string
  location: 'BALI' | 'JAKARTA' | 'SURABAYA' | 'BANDUNG' | 'YOGYAKARTA' | 'MALANG'
  mainImage?: string
  category: 'VILLA' | 'APARTMENT' | 'HOMESTAY'
}

export interface UpdatePropertyInput {
  name?: string
  description?: string
  location?: 'BALI' | 'JAKARTA' | 'SURABAYA' | 'BANDUNG' | 'YOGYAKARTA' | 'MALANG'
  mainImage?: string
  category?: 'VILLA' | 'APARTMENT' | 'HOMESTAY'
}

export interface PropertyQuery {
  location?: 'BALI' | 'JAKARTA' | 'SURABAYA' | 'BANDUNG' | 'YOGYAKARTA' | 'MALANG'
  category?: 'VILLA' | 'APARTMENT' | 'HOMESTAY'
  name?: string
  sortBy?: 'createdAt' | 'name'
  order?: 'asc' | 'desc'
}


