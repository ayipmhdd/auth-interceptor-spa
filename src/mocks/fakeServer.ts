// src/mocks/fakeServer.ts
import { authHandler } from "./handlers/authHandler";
import { userHandler } from "./handlers/userHandler";

export function initMockServer() {
    const originalFetch = window.fetch;

    // --- LOGIKA SATPAM (Validator Token) ---
    const isAuthorized = (options?: RequestInit): boolean => {
        if (!options || !options.headers) return false;
        let authHeader: string | null = null;

        if (options.headers instanceof Headers) {
            authHeader = options.headers.get("Authorization");
        } else if (Array.isArray(options.headers)) {
            const found = options.headers.find(h => h[0].toLowerCase() === 'authorization');
            authHeader = found ? found[1] : null;
        } else {
            const headers = options.headers as Record<string, string>;
            
            const keys = Object.keys(headers);
            const key = keys.find(k => k.toLowerCase() === 'authorization');
            authHeader = key ? headers[key] : null;
        }

        // Cek apakah token mengandung "EXPIRED" atau "DUMMY"
        if (authHeader && (authHeader.includes("EXPIRED") || authHeader.includes("DUMMY"))) {
            return false; 
        }
        return true; 
    };

    window.fetch = async (
        input: RequestInfo | URL,
        options?: RequestInit
    ): Promise<Response> => {
        let url: string;
        if (typeof input === "string") url = input;
        else if (input instanceof Request) url = input.url;
        else if (input instanceof URL) url = input.toString();
        else throw new Error("Unsupported input type");

        const path = new URL(url, window.location.origin).pathname;

        console.log(`[MockServer] Fetch called: ${path}`, options);

        // --- ROUTING ---
        if (path === "/api/login") {
            return authHandler.login(options);
        }

        if (path === "/api/refresh" || path === "/refresh-token") {
            console.log("[MockServer] Refresh endpoint hit - Memberikan token baru...");
            return authHandler.refresh();
        }

        if (path === "/api/profile" || path === "/user/profile") { // Handle variasi path profile juga
            if (!isAuthorized(options)) {
                console.log("[MockServer] ❌ 401 Unauthorized: Token Expired/Invalid");
                return new Response(JSON.stringify({ message: "Unauthorized" }), {
                    status: 401,
                    headers: { "Content-Type": "application/json" },
                });
            }
            console.log("[MockServer] ✅ Authorized. Accessing Profile...");
            return userHandler.profile(options);
        }

        // Default: Lewatkan ke fetch asli (internet)
        return originalFetch(input, options);
    };

    console.log("%cMock API Activated (Strict Mode)", "color: red; font-weight: bold;");
}