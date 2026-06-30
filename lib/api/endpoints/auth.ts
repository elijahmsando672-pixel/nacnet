import { MOCK_USERS } from "../mock-data";
import type { AuthTokens, User } from "@/types/auth";

const USE_MOCK = process.env.USE_MOCK_DATA === "true";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function loginApi(email: string, password: string): Promise<AuthTokens> {
  if (USE_MOCK) {
    const user = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid email or password");
    const { password: _, ...safeUser } = user;
    return { accessToken: `mock-token-${user.id}`, refreshToken: `mock-refresh-${user.id}`, user: safeUser };
  }
  const res = await fetch(`${API_URL}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
  if (!res.ok) { const e = await res.json(); throw new Error(e.message || "Login failed"); }
  return res.json();
}

export async function registerApi(name: string, email: string, password: string): Promise<AuthTokens> {
  if (USE_MOCK) {
    const exists = MOCK_USERS.find((u) => u.email === email);
    if (exists) throw new Error("Email already registered");
    const newUser: User = { id: `user-${Date.now()}`, email, name, role: "customer", createdAt: new Date().toISOString() };
    return { accessToken: `mock-token-${newUser.id}`, refreshToken: `mock-refresh-${newUser.id}`, user: newUser };
  }
  const res = await fetch(`${API_URL}/auth/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, password }) });
  if (!res.ok) { const e = await res.json(); throw new Error(e.message || "Registration failed"); }
  return res.json();
}

export async function refreshTokenApi(refreshToken: string): Promise<AuthTokens> {
  if (USE_MOCK) throw new Error("Mock refresh not implemented");
  const res = await fetch(`${API_URL}/auth/refresh`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ refreshToken }) });
  if (!res.ok) throw new Error("Token refresh failed");
  return res.json();
}
