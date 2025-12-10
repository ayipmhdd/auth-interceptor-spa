// src/context/GlobalLoadingContextValue.ts
import { createContext } from "react";

export interface GlobalLoadingContextValue {
    isGlobalLoading: boolean;
    showLoading: () => void;
    hideLoading: () => void;
}

export const GlobalLoadingContext = createContext<GlobalLoadingContextValue | null>(null);
