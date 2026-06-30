import { MOCK_PRODUCTS } from "../mock-data";
import type { Product, ProductInput } from "@/types/product";
import type { PaginatedResponse } from "@/types/api";

const USE_MOCK = process.env.USE_MOCK_DATA === "true";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

let localProducts = [...MOCK_PRODUCTS];

export async function listProducts(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
  status?: string;
  search?: string;
  merchantId?: string;
}): Promise<PaginatedResponse<Product>> {
  if (USE_MOCK) {
    let filtered = [...localProducts];

    if (params?.category) {
      filtered = filtered.filter((p) => p.category === params.category);
    }
    if (params?.status) {
      filtered = filtered.filter((p) => p.status === params.status);
    }
    if (params?.merchantId) {
      filtered = filtered.filter((p) => p.merchantId === params.merchantId);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 12;
    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const data = filtered.slice(start, start + pageSize);

    return { data, total, page, pageSize, totalPages };
  }

  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.pageSize) searchParams.set("pageSize", String(params.pageSize));
  if (params?.category) searchParams.set("category", params.category);
  if (params?.status) searchParams.set("status", params.status);
  if (params?.search) searchParams.set("search", params.search);
  if (params?.merchantId) searchParams.set("merchantId", params.merchantId);

  const res = await fetch(`${API_URL}/products?${searchParams}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProductBySlug(slug: string): Promise<Product> {
  if (USE_MOCK) {
    const product = localProducts.find((p) => p.slug === slug);
    if (!product) throw new Error("Product not found");
    return product;
  }
  const res = await fetch(`${API_URL}/products/slug/${slug}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}

export async function getProductById(id: string): Promise<Product> {
  if (USE_MOCK) {
    const product = localProducts.find((p) => p.id === id);
    if (!product) throw new Error("Product not found");
    return product;
  }
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}

export async function createProduct(input: ProductInput & { merchantId: string }): Promise<Product> {
  if (USE_MOCK) {
    const slug = input.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const existing = localProducts.find((p) => p.slug === slug);
    const uniqueSlug = existing ? `${slug}-${Date.now()}` : slug;
    const product: Product = {
      id: `prod-${Date.now()}`,
      ...input,
      slug: uniqueSlug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    localProducts.push(product);
    return product;
  }
  const res = await fetch(`${API_URL}/products`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) });
  if (!res.ok) { const e = await res.json(); throw new Error(e.message || "Failed to create product"); }
  return res.json();
}

export async function updateProduct(id: string, input: Partial<ProductInput>): Promise<Product> {
  if (USE_MOCK) {
    const idx = localProducts.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error("Product not found");
    const updated: Product = {
      ...localProducts[idx],
      ...input,
      updatedAt: new Date().toISOString(),
    };
    localProducts[idx] = updated;
    return updated;
  }
  const res = await fetch(`${API_URL}/products/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) });
  if (!res.ok) { const e = await res.json(); throw new Error(e.message || "Failed to update product"); }
  return res.json();
}

export async function deleteProduct(id: string): Promise<void> {
  if (USE_MOCK) {
    const idx = localProducts.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error("Product not found");
    localProducts.splice(idx, 1);
    return;
  }
  const res = await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete product");
}

export async function getCategories(): Promise<string[]> {
  if (USE_MOCK) {
    return [...new Set(localProducts.map((p) => p.category))];
  }
  const res = await fetch(`${API_URL}/products/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}
