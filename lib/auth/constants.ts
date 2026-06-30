export const ACCESS_TOKEN_COOKIE = "access_token";
export const REFRESH_TOKEN_COOKIE = "refresh_token";
export const SESSION_USER_COOKIE = "session_user";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export const ACCESS_TOKEN_MAX_AGE = 60 * 60;
export const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7;

export const ROLE_HOMES = {
  customer: "/products",
  merchant: "/dashboard",
  admin: "/admin/dashboard",
} as const;
