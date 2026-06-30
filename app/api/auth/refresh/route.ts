import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE, SESSION_USER_COOKIE, COOKIE_OPTIONS, ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from "@/lib/auth/constants";
import { refreshTokenApi } from "@/lib/api/endpoints/auth";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = request.cookies;
    const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
    if (!refreshToken) {
      return NextResponse.json({ message: "No refresh token" }, { status: 401 });
    }
    const tokens = await refreshTokenApi(refreshToken);
    const response = NextResponse.json({ user: tokens.user });
    response.cookies.set(ACCESS_TOKEN_COOKIE, tokens.accessToken, { ...COOKIE_OPTIONS, maxAge: ACCESS_TOKEN_MAX_AGE });
    response.cookies.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, { ...COOKIE_OPTIONS, maxAge: REFRESH_TOKEN_MAX_AGE });
    response.cookies.set(SESSION_USER_COOKIE, JSON.stringify(tokens.user), { ...COOKIE_OPTIONS, httpOnly: false, maxAge: ACCESS_TOKEN_MAX_AGE });
    return response;
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Token refresh failed" }, { status: 401 });
  }
}
