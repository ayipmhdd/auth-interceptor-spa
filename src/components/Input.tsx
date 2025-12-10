// src/components/Input.tsx
import type { InputHTMLAttributes } from "react"; // type-only import

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export function Input({ label, ...props }: InputProps) {
    return (
        <div className="flex flex-col gap-1 w-full">
            {label && <label className="text-sm font-medium">{label}</label>}
            <input
                {...props}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}
