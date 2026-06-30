import { MOCK_USERS } from "../mock-data";
import type { User } from "@/types/auth";
import type { PaginatedResponse } from "@/types/api";

const USE_MOCK = process.env.USE_MOCK_DATA === "true";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

let localUsers: User[] = MOCK_USERS.map(({ password: _, ...user }) => user);

export async function listUsers(params?: {
  page?: number;
  pageSize?: number;
  role?: string;
  search?: string;
}): Promise<PaginatedResponse<User>> {
  if (USE_MOCK) {
    let filtered = [...localUsers];

    if (params?.role) filtered = filtered.filter((u) => u.role === params.role);
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
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
  if (params?.role) searchParams.set("role", params.role);
  if (params?.search) searchParams.set("search", params.search);

  const res = await fetch(`${API_URL}/users?${searchParams}`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}
