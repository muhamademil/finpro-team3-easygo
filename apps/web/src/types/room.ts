export interface Room {
  id: number;
  name: string;
  description?: string;
  basePrice: string;
  capacity: number;
  picture?: string;
  propertyId: number;
}
