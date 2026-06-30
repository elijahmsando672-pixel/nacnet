export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type ApiErrorShape = {
  message: string;
  status: number;
  code?: string;
  details?: Record<string, string[]>;
};
