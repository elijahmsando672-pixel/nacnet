import { cookies } from "next/headers";
import { SESSION_USER_COOKIE } from "./constants";
import type { User, Role } from "@/types/auth";

export async function getSession(): Promise<{ user: User } | null> {
  const cookieStore = await cookies();
  const sessionUser = cookieStore.get(SESSION_USER_COOKIE)?.value;
  if (!sessionUser) return null;
  try {
    return { user: JSON.parse(sessionUser) as User };
  } catch {
    return null;
  }
}

export async function requireSession(): Promise<{ user: User }> {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

export async function requireRole(...roles: Role[]): Promise<{ user: User }> {
  const session = await requireSession();
  if (!roles.includes(session.user.role)) throw new Error("Forbidden");
  return session;
}
