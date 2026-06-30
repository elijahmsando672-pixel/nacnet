import { NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE, SESSION_USER_COOKIE, COOKIE_OPTIONS } from "@/lib/auth/constants";

export async function POST() {
  const response = NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"));
  response.cookies.set(ACCESS_TOKEN_COOKIE, "", { ...COOKIE_OPTIONS, maxAge: 0 });
  response.cookies.set(REFRESH_TOKEN_COOKIE, "", { ...COOKIE_OPTIONS, maxAge: 0 });
  response.cookies.set(SESSION_USER_COOKIE, "", { ...COOKIE_OPTIONS, httpOnly: false, maxAge: 0 });
  return response;
}
