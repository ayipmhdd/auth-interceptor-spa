// src/context/GlobalLoadingContext.tsx
import { useState, type ReactNode } from "react";
import { GlobalLoadingContext } from "./GlobalLoadingContextValue"; // hapus tipe yang tidak dipakai

interface ProviderProps {
    children: ReactNode;
}

export const GlobalLoadingProvider = ({ children }: ProviderProps) => {
    const [isGlobalLoading, setIsGlobalLoading] = useState(false);

    const showLoading = () => setIsGlobalLoading(true);
    const hideLoading = () => setIsGlobalLoading(false);

    return (
        <GlobalLoadingContext.Provider value={{ isGlobalLoading, showLoading, hideLoading }}>
            {children}

            {isGlobalLoading && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent animate-spin rounded-full"></div>
                </div>
            )}
        </GlobalLoadingContext.Provider>
    );
};
