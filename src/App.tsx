// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import type { ReactElement } from "react";

import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

import { useProtectedRoute } from "./hooks/useProtectedRoute";

function ProtectedRoute({ children }: { children: ReactElement }) {
  const isAllowed = useProtectedRoute();

  if (!isAllowed) return <Navigate to="/login" replace />;

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Private Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
