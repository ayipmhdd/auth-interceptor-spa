// src/utils/storage.ts
export type StorageType = "local" | "session";

const getStore = (type: StorageType) =>
    type === "local" ? window.localStorage : window.sessionStorage;

export function storageSet<T>(key: string, value: T, type: StorageType = "local") {
    try {
        const store = getStore(type);
        store.setItem(key, JSON.stringify(value));
    } catch (err) {
        console.error("storageSet failed:", err);
    }
}

export function storageGet<T>(key: string, type: StorageType = "local"): T | null {
    try {
        const store = getStore(type);
        const raw = store.getItem(key);
        if (!raw) return null;
        return JSON.parse(raw) as T;
    } catch (err) {
        console.error("storageGet failed:", err);
        return null;
    }
}

export function storageRemove(key: string, type: StorageType = "local") {
    try {
        const store = getStore(type);
        store.removeItem(key);
    } catch (err) {
        console.error("storageRemove failed:", err);
    }
}

// --- Helper khusus token ---
export const setAccessToken = (token: string) => {
    storageSet("access_token", token, "local");
};

export const setRefreshToken = (token: string) => {
    storageSet("refresh_token", token, "local");
};

export const getAccessToken = () => {
    return storageGet<string>("access_token", "local");
};

export const getRefreshToken = () => {
    return storageGet<string>("refresh_token", "local");
};

export const clearTokens = () => {
    storageRemove("access_token", "local");
    storageRemove("refresh_token", "local");
};
