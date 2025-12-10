import { Button } from "../components/Button";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Selamat datang di Dashboard</p>

            <div className="flex gap-2">
                <Button variant="outline" onClick={logout}>
                    Logout
                </Button>

                <Button onClick={() => navigate("/profile")}>
                    Go to Profile
                </Button>
            </div>
        </div>
    );
}
