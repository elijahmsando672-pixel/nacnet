import { MOCK_ORDERS, MOCK_MERCHANT_STATS, MOCK_ADMIN_STATS } from "../mock-data";
import type { Order, OrderStatus, DashboardStats } from "@/types/order";
import type { PaginatedResponse } from "@/types/api";

const USE_MOCK = process.env.USE_MOCK_DATA === "true";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

let localOrders = [...MOCK_ORDERS];

export async function listOrders(params?: {
  page?: number;
  pageSize?: number;
  status?: OrderStatus;
  merchantId?: string;
  customerId?: string;
}): Promise<PaginatedResponse<Order>> {
  if (USE_MOCK) {
    let filtered = [...localOrders];

    if (params?.status) filtered = filtered.filter((o) => o.status === params.status);
    if (params?.merchantId) filtered = filtered.filter((o) => o.merchantId === params.merchantId);
    if (params?.customerId) filtered = filtered.filter((o) => o.customerId === params.customerId);

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
  if (params?.merchantId) searchParams.set("merchantId", params.merchantId);
  if (params?.customerId) searchParams.set("customerId", params.customerId);

  const res = await fetch(`${API_URL}/orders?${searchParams}`);
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function getOrder(id: string): Promise<Order> {
  if (USE_MOCK) {
    const order = localOrders.find((o) => o.id === id);
    if (!order) throw new Error("Order not found");
    return order;
  }
  const res = await fetch(`${API_URL}/orders/${id}`);
  if (!res.ok) throw new Error("Order not found");
  return res.json();
}

export async function createOrder(input: {
  customerId: string;
  customerName: string;
  customerEmail: string;
  merchantId: string;
  items: { productId: string; name: string; price: number; quantity: number; imageUrl: string }[];
  total: number;
  shippingAddress: Order["shippingAddress"];
}): Promise<Order> {
  if (USE_MOCK) {
    const order: Order = {
      id: `order-${Date.now()}`,
      ...input,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    localOrders.push(order);
    return order;
  }
  const res = await fetch(`${API_URL}/orders`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) });
  if (!res.ok) { const e = await res.json(); throw new Error(e.message || "Failed to create order"); }
  return res.json();
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
  if (USE_MOCK) {
    const idx = localOrders.findIndex((o) => o.id === id);
    if (idx === -1) throw new Error("Order not found");
    localOrders[idx] = { ...localOrders[idx], status, updatedAt: new Date().toISOString() };
    return localOrders[idx];
  }
  const res = await fetch(`${API_URL}/orders/${id}/status`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
  if (!res.ok) { const e = await res.json(); throw new Error(e.message || "Failed to update order status"); }
  return res.json();
}

export async function getMerchantStats(merchantId: string): Promise<DashboardStats> {
  if (USE_MOCK) {
    return { ...MOCK_MERCHANT_STATS };
  }
  const res = await fetch(`${API_URL}/orders/stats/merchant/${merchantId}`);
  if (!res.ok) throw new Error("Failed to fetch merchant stats");
  return res.json();
}

export async function getAdminStats(): Promise<DashboardStats> {
  if (USE_MOCK) {
    return { ...MOCK_ADMIN_STATS };
  }
  const res = await fetch(`${API_URL}/orders/stats/admin`);
  if (!res.ok) throw new Error("Failed to fetch admin stats");
  return res.json();
}
