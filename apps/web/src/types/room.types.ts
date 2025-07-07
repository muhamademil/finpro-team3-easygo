export interface RoomType {
  id: string;
  name: string;
  base_price: number;
  max_guest: number;
  images: {
    image_url: string;
  }[];
}
