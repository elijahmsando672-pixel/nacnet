"use client";
import { useQuery } from "@tanstack/react-query";
import { listMerchants } from "@/lib/api/endpoints/merchants";

export function useMerchants(params?: { page?: number; status?: string; search?: string }) {
  return useQuery({ queryKey: ["merchants", params], queryFn: () => listMerchants(params) });
}
