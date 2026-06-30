export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number | null;
  imageUrl: string;
  category: string;
  stock: number;
  status: "active" | "draft" | "archived";
  merchantId: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductInput = {
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number | null;
  imageUrl: string;
  category: string;
  stock: number;
  status: "active" | "draft" | "archived";
};
