// src/mocks/handlers/authHandler.ts

interface TokenStore {
    accessToken: string;
    refreshToken: string;
    accessExpiry: number;
    refreshExpiry: number;
}

const dummyUser = {
    username: "ayip",
    password: "123456",
};

// tokenStore diexport agar bisa diakses dari userHandler
export const tokenStore: TokenStore = {
    accessToken: "ACCESS_TOKEN_INITIAL",
    refreshToken: "REFRESH_TOKEN_INITIAL",
    accessExpiry: Date.now() + 10 * 1000, // access token expire 10 detik
    refreshExpiry: Date.now() + 60 * 1000, // refresh expire 1 menit
};

// Fungsi generate token
function generateTokens() {
    tokenStore.accessToken = "ACCESS_" + Math.random().toString(36).substring(2);
    tokenStore.refreshToken = "REFRESH_" + Math.random().toString(36).substring(2);
    tokenStore.accessExpiry = Date.now() + 10 * 1000;
    tokenStore.refreshExpiry = Date.now() + 60 * 1000;
}

// Export authHandler
export const authHandler = {
    tokenStore, // ditambahkan agar bisa diakses di userHandler

    async login(options?: RequestInit): Promise<Response> {
        if (!options?.body) {
            return new Response(
                JSON.stringify({ message: "Missing body" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const body = JSON.parse(options.body as string) as { username: string; password: string };
        const { username, password } = body;

        if (username !== dummyUser.username || password !== dummyUser.password) {
            return new Response(
                JSON.stringify({ message: "Wrong credentials" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        generateTokens();

        return new Response(
            JSON.stringify({
                accessToken: tokenStore.accessToken,
                refreshToken: tokenStore.refreshToken,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    },

    async refresh(): Promise<Response> {
        if (Date.now() > tokenStore.refreshExpiry) {
            return new Response(
                JSON.stringify({ message: "Refresh expired" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        generateTokens();

        return new Response(
            JSON.stringify({
                accessToken: tokenStore.accessToken,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    },
};
