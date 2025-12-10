// src/hooks/useFetch.ts
import { useEffect, useState } from "react";
import { httpClient } from "../api/httpClient";

export function useFetch<T>(url: string, deps: unknown[] = []) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                setLoading(true);
                const res = await httpClient.get(url);

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const json: T = await res.json();

                if (mounted) setData(json);
            } catch (err) {
                if (mounted) {
                    console.error(err);
                    setError("Failed to fetch data");
                }
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();

        return () => {
            mounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return { data, loading, error };
}
