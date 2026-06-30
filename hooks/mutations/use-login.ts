"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useLogin() {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Login failed");
      }
      return res.json();
    },
    onSuccess: (data) => {
      const home =
        data.user.role === "admin"
          ? "/admin/dashboard"
          : data.user.role === "merchant"
            ? "/dashboard"
            : "/products";
      router.push(home);
      router.refresh();
    },
  });
}
