// src/api/userApi.ts
import { httpClient } from "./httpClient";

export async function getUsers() {
    const res = await httpClient.get("/api/users");
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
}

export async function getUserById(id: number) {
    const res = await httpClient.get(`/api/users/${id}`);
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
}
