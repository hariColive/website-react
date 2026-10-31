export interface Property {
  id: number;
  name: string;
  image: string;
  location: string;
  city: string;
  price: number;
  highlights: string;
  url: string;
  amenities?: string[];
}