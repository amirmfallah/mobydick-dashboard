export interface Ingredients {
  _id: string;
  name: string;
  thumbnail?: string;
  price: number;
  available: boolean;
}

export interface IngredientItem {
  item: Ingredients;
  required: boolean;
  included: boolean;
  forOption?: number;
}

export interface IngredientItemUnpopulated {
  item: string;
  required: boolean;
  included: boolean;
}
export interface priceItem {
  _id: string;
  optionName: string;
  price: number;
  index: number;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  thumbnail: string;
  price: Array<priceItem>;
  discount: number;
  available: boolean;
  category: string;
  bread?: Array<IngredientItem>;
  ingredients?: Array<IngredientItem>;
  optional?: Array<IngredientItem>;
}

export interface ProductUnpopulated {
  _id: string;
  name: string;
  description: string;
  thumbnail: string;
  price: Array<priceItem>;
  discount: number;
  available: boolean;
  category: string;
  bread?: Array<IngredientItemUnpopulated>;
  ingredients?: Array<IngredientItemUnpopulated>;
  optional?: Array<IngredientItemUnpopulated>;
}

export interface productsResponse {
  items: ProductUnpopulated[];
  pages: number;
  limit: number;
  count: number;
  currentPage: number;
}

export interface Category {
  _id: string;
  name: string;
  thumbnail: string;
  products: Array<Product>;
}

export interface CategoryUnpopulated {
  _id: string;
  name: string;
  thumbnail: string;
  products: Array<ProductUnpopulated>;
}
