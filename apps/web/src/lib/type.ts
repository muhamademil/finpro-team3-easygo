export type Destination = {
  id: number;
  name: string;
  image: string;
};

export type Property = {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  category: 'Villa' | 'Apartment' | 'House';
};

export type Category = {
  id: number;
  name: string;
  image: string;
  href: string;
};
