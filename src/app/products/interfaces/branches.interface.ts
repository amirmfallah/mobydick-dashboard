export interface branch {
  _id?: string;
  name: string;
  description: string;
  thumbnail: string;
  favoriteProducts?: string[];
  sliderPictures?: string[];
  status?: boolean;
  verified?: boolean;
  ownerId?: string;
  address: Address;
}

export interface Address {
  address: string;
  lat: number;
  lng: number;
  phone: string;
  description: string;
  open: boolean;
}
