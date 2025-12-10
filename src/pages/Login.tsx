import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useAuth } from "../auth/useAuth";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin() {
        try {
            setLoading(true);
            setError("");

            await login({ username, password });

            // Redirect ke Dashboard setelah login sukses
            navigate("/", { replace: true });
        } catch {
            setError("Username atau password salah");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-screen flex justify-center items-center bg-gray-50">
            <div className="w-80 bg-white shadow p-6 rounded-lg flex flex-col gap-4">
                <h1 className="text-xl font-bold text-center">Login</h1>

                <Input
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <Button onClick={handleLogin} loading={loading}>
                    Login
                </Button>
            </div>
        </div>
    );
}
