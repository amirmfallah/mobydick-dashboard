import { User } from 'src/app/products/interfaces/branches.interface';
import {
  Ingredients,
  Product,
} from 'src/app/products/interfaces/products.interface';

export interface OrderDto {
  status?: CartStatus;
  branchId?: string;
  cartId?: string;
  addressId?: string;
  giftId?: string;
  orderId?: string;
}

export interface OrderExistingDto {
  _id?: string;
  orderId?: string;
  status?: CartStatus;
  branchId?: string;
  cartId?: { _id: string };
  addressId?: Address;
  giftId?: { _id: string; code: string };
  total?: number;
  totalDiscount?: number;
  ownerId?: User;
}

export interface branchSearch {
  _id: string;
  name: string;
  thumbnail: string;
  description: string;
  address: Address;
}

export interface Address {
  _id: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  description: string;
  open: boolean;
}

export enum CartStatus {
  CANCELED = 'CANCELED',
  OPEN = 'OPEN',
  REGISTERED = 'REGISTERED',
  PREPARING = 'PREPARING',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
}

export enum CartStatusPersian {
  CANCELED = 'لغو شده',
  OPEN = 'باز',
  REGISTERED = 'ثبت شده',
  PREPARING = 'در حال آماده‌سازی',
  SENT = 'ارسال شده',
  DELIVERED = 'تحویل داده شده',
}

export interface CartItem {
  productId: string;
  bread: string[];
  optional: string[];
  ingredients: string[];
  option: string;
  count: number;
}

export interface CartItemPopulated {
  productId: Product;
  bread: Array<Ingredients>;
  optional: Array<Ingredients>;
  ingredients: Array<Ingredients>;
  option: string;
  count: number;
  calculatedPrice: number;
}

export interface CartDto {
  _id: string;
  ownerId: string;
  status: CartStatus;
  items: CartItemPopulated[];
}

export interface Gift {
  _id: string;
  validUntil: Date;
  code: string;
  amount?: number;
  percent?: number;
}
