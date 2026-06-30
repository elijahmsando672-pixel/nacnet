"use client";
import { useQuery } from "@tanstack/react-query";
import {
  listOrders,
  getOrder,
  getMerchantStats,
  getAdminStats,
} from "@/lib/api/endpoints/orders";
import type { OrderStatus } from "@/types/order";

export function useOrders(params?: {
  page?: number;
  status?: OrderStatus;
  merchantId?: string;
  customerId?: string;
}) {
  return useQuery({ queryKey: ["orders", params], queryFn: () => listOrders(params) });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
    enabled: !!id,
  });
}

export function useMerchantStats(merchantId: string) {
  return useQuery({
    queryKey: ["merchantStats", merchantId],
    queryFn: () => getMerchantStats(merchantId),
    enabled: !!merchantId,
  });
}

export function useAdminStats() {
  return useQuery({
    queryKey: ["adminStats"],
    queryFn: () => getAdminStats(),
  });
}
