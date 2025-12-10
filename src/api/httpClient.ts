// src/api/httpClient.ts

import { getAccessToken, getRefreshToken, setAccessToken } from "../utils/storage";
import { refreshTokenRequest } from "./authService";

// Status refresh agar tidak refresh berkali-kali
let isRefreshing = false;

// Queue request yang menunggu refresh token
let refreshQueue: Array<() => void> = [];

/**
 * HTTP Client dengan interceptor manual (fetch wrapper)
 */
async function fetchWithInterceptor(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    const token = getAccessToken();

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string> | undefined),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const requestOptions: RequestInit = {
        ...options,
        headers,
    };

    const response = await fetch(url, requestOptions); // pakai const

    if (response.status === 401) {
        return handle401(url, requestOptions);
    }

    return response;
}

/**
 * Handle expired token → refresh → retry original request
 */
async function handle401(url: string, options: RequestInit): Promise<Response> {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    // Jika sedang refresh token → masukkan ke queue
    if (isRefreshing) {
        return new Promise((resolve) => {
            refreshQueue.push(() => resolve(fetchWithInterceptor(url, options)));
        });
    }

    isRefreshing = true;

    try {
        // Request refresh token
        const newAccessToken = await refreshTokenRequest();

        // Simpan token baru
        setAccessToken(newAccessToken);

        // Jalankan ulang request asli
        const retryResponse = await fetchWithInterceptor(url, options);

        // Eksekusi request lain yang menunggu
        refreshQueue.forEach((callback) => callback());
        refreshQueue = [];

        return retryResponse;
    } catch (err) {
        console.error("Refresh token failed:", err);
        throw err;
    } finally {
        isRefreshing = false;
    }
}

/**
 * HTTP Client exposed seperti axios
 */
export const httpClient = {
    get: (url: string) => fetchWithInterceptor(url, { method: "GET" }),

    post: (url: string, body?: unknown) =>
        fetchWithInterceptor(url, {
            method: "POST",
            body: body ? JSON.stringify(body) : undefined,
        }),

    put: (url: string, body?: unknown) =>
        fetchWithInterceptor(url, {
            method: "PUT",
            body: body ? JSON.stringify(body) : undefined,
        }),

    delete: (url: string) => fetchWithInterceptor(url, { method: "DELETE" }),
};
