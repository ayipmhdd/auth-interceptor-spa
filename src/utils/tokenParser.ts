// src/utils/tokenParser.ts

export interface JwtPayload {
    exp?: number;
    iat?: number;
    sub?: string;
    role?: string;
    [key: string]: unknown; // ganti any -> unknown
}

/**
 * Parse JWT token dan kembalikan payload.
 * @param token JWT string
 * @returns payload sebagai JwtPayload atau null jika invalid
 */
export function parseJwt(token: string): JwtPayload | null {
    try {
        const base64 = token.split(".")[1];
        if (!base64) return null;

        // Decode Base64
        const decodedStr = atob(base64);

        // Parse JSON dan cast ke JwtPayload
        const decoded: JwtPayload = JSON.parse(decodedStr) as JwtPayload;
        return decoded;
    } catch {
        return null;
    }
}

/**
 * Cek apakah token sudah expired
 * @param token JWT string
 * @returns true jika expired atau invalid
 */
export function isTokenExpired(token: string): boolean {
    const payload = parseJwt(token);
    if (!payload?.exp) return true;

    const now = Math.floor(Date.now() / 1000);
    return now >= payload.exp;
}

export function getAuthHeaderToken(options?: RequestInit): string | null {
    // Cek header Authorization: "Bearer <token>"
    const authHeader = options?.headers
        ? (options.headers as Record<string, string>)["Authorization"]
        : null;
    return authHeader?.replace("Bearer ", "") ?? null;
}

