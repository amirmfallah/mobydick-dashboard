export interface searchResponse<type> {
  items: Array<type>;
  pages: number;
  limit: number;
  count: number;
  currentPage: number;
}

export interface CreateIngredient {
  name: string;
  price: number;
}
