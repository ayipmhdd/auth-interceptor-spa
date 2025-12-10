import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { loginRequest } from "../api/authApi";
import { getAccessToken, getRefreshToken, clearTokens } from "../utils/storage";

interface Props {
    children: ReactNode;
}

export function AuthProvider({ children }: Props) {
    const [accessToken, setAccessTokenState] = useState<string | null>(() => getAccessToken());
    const isAuthenticated = Boolean(accessToken && getRefreshToken());

    useEffect(() => {
        const handleTokenChange = () => {
            const token = getAccessToken();
            setAccessTokenState(token);
        };
        window.addEventListener("storage", handleTokenChange);
        return () => window.removeEventListener("storage", handleTokenChange);
    }, []);

    // Login menerima 1 object parameter
    async function login({ username, password }: { username: string; password: string }) {
        const res = await loginRequest(username, password);
        setAccessTokenState(res.accessToken);
    }

    function logout() {
        clearTokens();
        setAccessTokenState(null);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
