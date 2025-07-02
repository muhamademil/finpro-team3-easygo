// src/types/room.types.ts
export interface CreateRoomInput {
  property_id: string;
  name: string;
  base_price: number;
  max_guest: number;
}

export interface UpdateRoomInput {
  name?: string;
  base_price?: number;
  max_guest?: number;
}
