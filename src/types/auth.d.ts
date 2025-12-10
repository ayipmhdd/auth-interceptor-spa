// types/auth.d.ts

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role?: string; // admin | user | etc
}

export interface AuthContextState {
    user: AuthUser | null;
    loading: boolean;
    login: (cred: LoginCredentials) => Promise<void>;
    logout: () => void;
}

export interface DecodedJwtPayload {
    exp?: number;
    iat?: number;
    sub?: string;
    role?: string;
    [key: string]: unknown;
}
