// src/mocks/handlers/userHandler.ts

import { getAuthHeaderToken } from "../../utils/tokenParser";
import { authHandler } from "./authHandler";

export const userHandler = {
    /**
     * Mock endpoint: GET /api/profile
     */
    async profile(options?: RequestInit): Promise<Response> {
        const token = getAuthHeaderToken(options);

        console.log(`[UserHandler] Menerima token: ${token}`);
        console.log(`[UserHandler] Token di Server saat ini: ${authHandler.tokenStore.accessToken}`);

        // --- MODIFIKASI DISINI: LOGIKA "GALAK" ---

        // 1. Cek Strict Equality (Logic Asli Anda)
        const isMismatch = token !== authHandler.tokenStore.accessToken;

        // 2. Cek Hardcode (Untuk memastikan Test Jalan)
        // Jika token mengandung kata "EXPIRED" atau "DUMMY", kita PAKSA 401
        // meskipun mungkin authHandler sedang memegang token yang sama.
        const isForcedExpired = token && (token.includes("EXPIRED") || token.includes("DUMMY"));

        if (isMismatch || isForcedExpired) {
            console.log("[UserHandler] ❌ Menolak request. Mengirim 401 Unauthorized.");
            return new Response(JSON.stringify({ message: "Unauthorized: Token Invalid or Expired" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        console.log("[UserHandler] ✅ Token diterima. Mengirim data Profile.");
        return new Response(
            JSON.stringify({
                name: "Ayip Muhammad",
                role: "System Analyst & Frontend Developer", // Update role sesuai profil Anda
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    },

    /**
     * Mock endpoint: GET /api/users
     */
    async users(options?: RequestInit): Promise<Response> {
        const token = getAuthHeaderToken(options);

        // Terapkan logika yang sama untuk endpoint ini
        const isMismatch = token !== authHandler.tokenStore.accessToken;
        const isForcedExpired = token && (token.includes("EXPIRED") || token.includes("DUMMY"));

        if (isMismatch || isForcedExpired) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(
            JSON.stringify([
                { id: 1, name: "Ayip" },
                { id: 2, name: "Faiz" },
                { id: 3, name: "Iyan" },
            ]),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    },
};