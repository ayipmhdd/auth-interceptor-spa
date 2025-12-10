// src/scripts/testSilentRefresh.ts
import { httpClient } from "../api/httpClient";
import { saveTokens } from "../utils/token";

export async function testSilentRefresh() {
    console.log("⚙️ [Test] Setting up simulation tokens...");

    // PERBAIKAN DISINI:
    // Gunakan JSON.stringify agar formatnya aman dibaca oleh storageGet
    // (Karena storageGet melakukan JSON.parse)
    saveTokens({
        accessToken: JSON.stringify("Bearer DUMMY_TOKEN_EXPIRED"), 
        refreshToken: JSON.stringify("valid-refresh-token-123"),
    });

    console.log("🔥 Starting concurrency test with expired token...");

    const requests = Array.from({ length: 5 }, (_, i) =>
        httpClient.get(`/api/profile`).then(
            (res: unknown) => console.log(`✅ Request ${i + 1} success:`, res),
            (err: unknown) => console.error(`❌ Request ${i + 1} error:`, err)
        )
    );

    try {
        await Promise.all(requests);
        console.log("🎉 Concurrency test finished! All requests should be successful.");
    } catch (error) {
        console.error("💀 Test Failed:", error);
    }
}