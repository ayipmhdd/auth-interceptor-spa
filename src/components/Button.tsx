// src/components/Button.tsx
import type { ButtonHTMLAttributes } from "react"; // type-only import
import { forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline";
    loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, variant = "primary", loading = false, ...props }, ref) => {
        const base =
            "px-4 py-2 rounded-md font-medium transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

        const styles =
            variant === "primary"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "border border-gray-400 text-gray-700 hover:bg-gray-50";

        return (
            <button ref={ref} className={`${base} ${styles}`} {...props}>
                {loading ? "Loading..." : children}
            </button>
        );
    }
);

Button.displayName = "Button";
