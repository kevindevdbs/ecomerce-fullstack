export interface WholesaleOption {
  id: number;
  minQuantity: number;
  unitPrice: number;
}

export interface Category {
  id: number;
  name: string;
  image?: string | null;
  isVisible: boolean;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  additionalImages: string[];
  categoryId: number;
  category?: Category | null;
  shortDescription: string;
  fullDescription: string;
  details: string[];
  isVisible: boolean;
  hasLetterSelection: boolean | null;
  wholesaleOptions: WholesaleOption[];
}

export interface ActionResponse {
  success?: boolean;
  error?: string;
  data?: any;
}
