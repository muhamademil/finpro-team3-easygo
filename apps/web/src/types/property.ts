import { Room } from "./room";

export interface Property {
  id: number;
  name: string;
  description: string;
  location: string;
  category: string;
  mainImage?: string;
  createdAt: string;
  tenantId: number;
  rooms: Room[];
}
