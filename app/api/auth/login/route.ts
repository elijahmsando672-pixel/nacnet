import { NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE, SESSION_USER_COOKIE, COOKIE_OPTIONS, ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from "@/lib/auth/constants";
import { loginApi } from "@/lib/api/endpoints/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const tokens = await loginApi(email, password);
    const response = NextResponse.json({ user: tokens.user });
    response.cookies.set(ACCESS_TOKEN_COOKIE, tokens.accessToken, { ...COOKIE_OPTIONS, maxAge: ACCESS_TOKEN_MAX_AGE });
    response.cookies.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, { ...COOKIE_OPTIONS, maxAge: REFRESH_TOKEN_MAX_AGE });
    response.cookies.set(SESSION_USER_COOKIE, JSON.stringify(tokens.user), { ...COOKIE_OPTIONS, httpOnly: false, maxAge: ACCESS_TOKEN_MAX_AGE });
    return response;
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Login failed" }, { status: 401 });
  }
}
