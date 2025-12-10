// src/api/authApi.ts
import { httpClient } from "./httpClient";
import { setAccessToken, setRefreshToken } from "../utils/storage";

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export async function loginRequest(username: string, password: string) {
    const res = await httpClient.post("/api/login", {
        username,
        password,
    });

    if (!res.ok) throw new Error("Login failed");

    const data: LoginResponse = await res.json();

    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);

    return data;
}

export async function refreshTokenRequest(): Promise<string> {
    const res = await fetch("/api/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
    });

    if (!res.ok) {
        throw new Error("Refresh token failed");
    }

    const data = await res.json();
    return data.accessToken;
}

export async function getProfile() {
    const res = await httpClient.get("/api/profile");

    if (!res.ok) throw new Error("Failed to get profile");
    return res.json();
}
