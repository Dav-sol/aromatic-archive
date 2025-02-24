
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: "male" | "female";
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  isOnSale?: boolean;
}

export type SortOption = "price" | "name" | "brand";
export type FilterOption = "all" | "male" | "female";
