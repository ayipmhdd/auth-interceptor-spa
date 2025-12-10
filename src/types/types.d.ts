// types/api.d.ts

export interface ApiResponse<T> {
    data: T;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}

export interface ApiError {
    status: number;
    message: string;
    details?: unknown;
}
