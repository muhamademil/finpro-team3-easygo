export interface RoomAvailability {
  id: number;
  roomId: number;
  date: string;
  isAvailable: boolean;
  priceOverride?: string;
}