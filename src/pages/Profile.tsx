// src/pages/Profile.tsx
import { useEffect, useState } from "react";
import { getProfile } from "../api/authApi";
import { Loading } from "../components/Loading";

interface ProfileData {
    name: string;
    role: string;
}

export default function Profile() {
    const [data, setData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const res = await getProfile();
                setData(res);
            } catch (err) {
                console.error("Profile error:", err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-2">
            <h1 className="text-2xl font-bold">Profile</h1>

            {data ? (
                <>
                    <p>Nama: {data.name}</p>
                    <p>Role: {data.role}</p>
                </>
            ) : (
                <p className="text-red-500">Gagal memuat profile</p>
            )}
        </div>
    );
}
