export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  discount: number;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  games: Product[];
}

export interface CategoryComponentData {
  categoryId?: number;
  category?: Category;
  products?: Product[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  birthDate: string;
  isAdmin: boolean;
}

export interface Storage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}
