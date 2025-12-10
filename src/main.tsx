// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

import { AuthProvider } from "./auth/AuthProvider";
import { GlobalLoadingProvider } from "./context/GlobalLoadingContext";

// --- START: SETUP SIMULASI ---
if (import.meta.env.DEV) {
  const { initMockServer } = await import("./mocks/fakeServer");
  initMockServer();

  console.log("⚙️ [Main] Setting up Simulation Tokens...");
  
  localStorage.setItem("accessToken", JSON.stringify("Bearer DUMMY_TOKEN_EXPIRED")); 
  localStorage.setItem("refreshToken", JSON.stringify("valid-refresh-token-123")); 
}
// --- END: SETUP SIMULASI ---

import { testSilentRefresh } from "./scripts/testSilentRefresh";

// Jalankan test script
testSilentRefresh();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalLoadingProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GlobalLoadingProvider>
  </React.StrictMode>
);