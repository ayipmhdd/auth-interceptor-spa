import { createContext } from "react";

export interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
}

export interface AuthContextType extends AuthState {
    login: (credentials: { username: string; password: string }) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    accessToken: null,
    login: async () => {},
    logout: () => {},
});
