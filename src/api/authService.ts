// src/api/authService.ts
import { storageGet, storageSet, storageRemove } from "../utils/storage";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

// LOGIN REQUEST
export async function loginRequest(username: string, password: string) {
    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    const data = await response.json();

    storageSet(ACCESS_TOKEN_KEY, data.accessToken);
    storageSet(REFRESH_TOKEN_KEY, data.refreshToken);

    return data;
}

// REFRESH TOKEN REQUEST
export async function refreshTokenRequest(): Promise<string> {
    const refreshToken = storageGet<string>(REFRESH_TOKEN_KEY);

    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    const response = await fetch("http://localhost:3000/refresh-token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
        throw new Error("Refresh token failed");
    }

    const data = await response.json();

    // Simpan token baru
    storageSet(ACCESS_TOKEN_KEY, data.accessToken);
    storageSet(REFRESH_TOKEN_KEY, data.refreshToken);

    return data.accessToken;
}

// LOGOUT
export function logout() {
    storageRemove(ACCESS_TOKEN_KEY);
    storageRemove(REFRESH_TOKEN_KEY);
}
