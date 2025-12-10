// src/config/env.ts

// Validasi strict untuk environment variable
const getEnv = (key: string, fallback?: string): string => {
    const value = import.meta.env[key];
    if (value === undefined || value === "") {
        if (fallback !== undefined) return fallback;
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
};

export const ENV = {
    MODE: getEnv("MODE", "development"),
    API_URL: getEnv("VITE_API_URL", "http://localhost:3000"), // fallback
    MOCK_API: getEnv("VITE_USE_MOCK", "true") === "true",
};
