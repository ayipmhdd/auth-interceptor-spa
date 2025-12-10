// src/config/constants.ts

// Base API path yang dipakai httpClient
export const API_BASE_URL = "/api";

// Dummy token prefix (optional, biar konsisten)
export const TOKEN_PREFIX = "Bearer";

// Key localStorage
export const STORAGE_KEYS = {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
    USER: "user_info",
};

// Timeout request default (ms)
export const DEFAULT_TIMEOUT = 10_000;

// Retry refresh max attempts
export const MAX_REFRESH_RETRY = 1;
