// src/hooks/useProtectedRoute.ts
import { useAuth } from "../auth/useAuth";

/**
 * Hook untuk mengecek apakah user sudah login
 * @returns boolean
 */
export function useProtectedRoute(): boolean {
    const { isAuthenticated } = useAuth();
    return isAuthenticated;
}
