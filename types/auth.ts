export type Role = "customer" | "merchant" | "admin";

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt?: string;
};

export type Session = {
  user: User;
  accessToken: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  user: User;
};
