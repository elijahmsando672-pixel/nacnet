import { ApiError } from "./errors";

type RequestConfig = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
};

type ApiClientOptions = {
  baseUrl: string;
  getToken?: () => string | null;
  onUnauthorized?: () => Promise<void>;
};

export class ApiClient {
  private baseUrl: string;
  private getToken?: () => string | null;
  private onUnauthorized?: () => Promise<void>;

  constructor(options: ApiClientOptions) {
    this.baseUrl = options.baseUrl;
    this.getToken = options.getToken;
    this.onUnauthorized = options.onUnauthorized;
  }

  private async request<T>(path: string, config: RequestConfig): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...config.headers,
    };

    const token = this.getToken?.();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: config.method,
      headers,
      body: config.body ? JSON.stringify(config.body) : undefined,
    });

    if (!response.ok) {
      if (response.status === 401 && this.onUnauthorized) {
        await this.onUnauthorized();
        const newToken = this.getToken?.();
        if (newToken) headers["Authorization"] = `Bearer ${newToken}`;
        const retryResponse = await fetch(`${this.baseUrl}${path}`, {
          method: config.method,
          headers,
          body: config.body ? JSON.stringify(config.body) : undefined,
        });
        if (retryResponse.ok) return retryResponse.json();
      }
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new ApiError(response.status, error.message || "Request failed", error.code, error.details);
    }

    return response.json();
  }

  get<T>(path: string) { return this.request<T>(path, { method: "GET" }); }
  post<T>(path: string, body?: unknown) { return this.request<T>(path, { method: "POST", body }); }
  put<T>(path: string, body?: unknown) { return this.request<T>(path, { method: "PUT", body }); }
  patch<T>(path: string, body?: unknown) { return this.request<T>(path, { method: "PATCH", body }); }
  delete<T>(path: string) { return this.request<T>(path, { method: "DELETE" }); }
}
