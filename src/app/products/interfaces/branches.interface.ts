export interface branch {
  _id?: string;
  name: string;
  description: string;
  thumbnail: string;
  favoriteProducts?: string[];
  sliderPictures?: string[];
  status?: boolean;
  verified?: boolean;
  ownerId?: User;
  address: Address;
}

export interface User {
  firstname?: string;
  phone?: string;
  email?: string;
  password?: string;
  lastPassword?: string;
}
export interface Address {
  address: string;
  lat: number;
  lng: number;
  phone: string;
  description: string;
  open: boolean;
}

export interface patchBranch {
  _id?: string;
  name?: string;
  description?: string;
  thumbnail?: string;
  favoriteProducts?: string[];
  sliderPictures?: string[];
  status?: boolean;
  verified?: boolean;
  ownerId?: User;
  address?: Address;
}
