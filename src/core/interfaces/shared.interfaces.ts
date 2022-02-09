export interface searchResponse<type> {
  items: Array<type>;
  pages: number;
  limit: number;
  count: number;
  currentPage: number;
}

export interface CreateIngredient {
  _id?: string;
  name?: string;
  price?: number;
}
