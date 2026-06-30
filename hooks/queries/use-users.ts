"use client";
import { useQuery } from "@tanstack/react-query";
import { listUsers } from "@/lib/api/endpoints/users";

export function useUsers(params?: { page?: number; role?: string; search?: string }) {
  return useQuery({ queryKey: ["users", params], queryFn: () => listUsers(params) });
}
