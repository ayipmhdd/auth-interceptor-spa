// utils/token.ts
import { storageGet, storageSet, storageRemove } from "./storage";

export interface TokenBundle {
    accessToken: string;
    refreshToken: string;
}

const KEY = "auth_tokens";

export function saveTokens(tokens: TokenBundle) {
    storageSet(KEY, tokens);
}

export function getTokens(): TokenBundle | null {
    return storageGet<TokenBundle>(KEY);
}

export function removeTokens() {
    storageRemove(KEY);
}

export function getAccessToken(): string | null {
    const t = getTokens();
    return t?.accessToken ?? null;
}

export function getRefreshToken(): string | null {
    const t = getTokens();
    return t?.refreshToken ?? null;
}

export function updateAccessToken(newAccess: string) {
    const t = getTokens();
    if (!t) return;
    saveTokens({ ...t, accessToken: newAccess });
}
