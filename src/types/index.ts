
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
  discountPercentage?: number;
  isFeatured?: boolean;
  fragranceNotes?: {
    top: any[];
    middle: any[];
    base: any[];
  };
}

export type SortOption = "price" | "name" | "brand";
export type FilterOption = "all" | "male" | "female";
