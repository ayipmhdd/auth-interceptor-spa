// src/context/useGlobalLoading.ts
import { useContext } from "react";
import { GlobalLoadingContext } from "./GlobalLoadingContextValue";

export const useGlobalLoading = () => {
    const ctx = useContext(GlobalLoadingContext);
    if (!ctx) throw new Error("useGlobalLoading must be used inside GlobalLoadingProvider");
    return ctx;
};
