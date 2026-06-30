import { MOCK_MERCHANTS } from "../mock-data";

const USE_MOCK = process.env.USE_MOCK_DATA === "true";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export type Merchant = {
  id: string;
  name: string;
  email: string;
  status: "active" | "pending" | "suspended";
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  createdAt: string;
};

let localMerchants = [...MOCK_MERCHANTS];

export async function listMerchants(params?: {
  page?: number;
  pageSize?: number;
  status?: string;
  search?: string;
}): Promise<{ data: Merchant[]; total: number; page: number; pageSize: number; totalPages: number }> {
  if (USE_MOCK) {
    let filtered = [...localMerchants];

    if (params?.status) filtered = filtered.filter((m) => m.status === params.status);
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter((m) => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q));
    }

    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 10;
    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const data = filtered.slice(start, start + pageSize);

    return { data, total, page, pageSize, totalPages };
  }

  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.pageSize) searchParams.set("pageSize", String(params.pageSize));
  if (params?.status) searchParams.set("status", params.status);
  if (params?.search) searchParams.set("search", params.search);

  const res = await fetch(`${API_URL}/merchants?${searchParams}`);
  if (!res.ok) throw new Error("Failed to fetch merchants");
  return res.json();
}

export async function getMerchant(id: string): Promise<Merchant> {
  if (USE_MOCK) {
    const merchant = localMerchants.find((m) => m.id === id);
    if (!merchant) throw new Error("Merchant not found");
    return merchant;
  }
  const res = await fetch(`${API_URL}/merchants/${id}`);
  if (!res.ok) throw new Error("Merchant not found");
  return res.json();
}
