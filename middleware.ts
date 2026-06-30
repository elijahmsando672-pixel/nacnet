import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN_COOKIE, SESSION_USER_COOKIE, ROLE_HOMES } from "@/lib/auth/constants";
import type { Role } from "@/types/auth";

const PUBLIC_EXACT = ["/", "/about", "/login", "/register", "/forgot-password", "/search", "/wishlist", "/support"];
const PUBLIC_PREFIXES = ["/products", "/category", "/seller"];

function isPublicPath(pathname: string): boolean {
  if (PUBLIC_EXACT.includes(pathname)) return true;
  if (PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return true;
  if (pathname.startsWith("/api/auth")) return true;
  if (pathname === "/cart") return true;
  return false;
}

type AccessRequirement = Role | "any-authenticated";

function getAccessRequirement(pathname: string): AccessRequirement | null {
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/dashboard")) return "merchant";
  if (pathname.startsWith("/orders")) return "merchant";
  if (pathname.startsWith("/checkout") || pathname.startsWith("/account")) return "any-authenticated";
  return null;
}

function parseUserRole(request: NextRequest): Role | null {
  const sessionUser = request.cookies.get(SESSION_USER_COOKIE)?.value;
  if (!sessionUser) return null;
  try {
    return (JSON.parse(sessionUser) as { role: Role }).role;
  } catch { return null; }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isPublicPath(pathname)) return NextResponse.next();
  const requirement = getAccessRequirement(pathname);
  if (!requirement) return NextResponse.next();
  const hasToken = !!request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const userRole = parseUserRole(request);
  if (!hasToken || !userRole) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }
  if (requirement === "any-authenticated") return NextResponse.next();
  if (userRole !== requirement) return NextResponse.redirect(new URL(ROLE_HOMES[userRole], request.url));
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"] };
