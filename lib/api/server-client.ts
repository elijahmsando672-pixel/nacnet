import { cookies } from "next/headers";
import { ApiClient } from "./client";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/auth/constants";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function createServerClient(): Promise<ApiClient> {
  const cookieStore = await cookies();

  const getToken = () => cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? null;

  const onUnauthorized = async () => {
    const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
    if (!refreshToken) return;
    try {
      const res = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      if (!res.ok) return;
      const data = await res.json();
      cookieStore.set(ACCESS_TOKEN_COOKIE, data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
      });
    } catch {
      // refresh failed silently
    }
  };

  return new ApiClient({ baseUrl: API_URL, getToken, onUnauthorized });
}
