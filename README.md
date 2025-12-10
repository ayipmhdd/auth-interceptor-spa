# 🔐 Secure SPA Auth Interceptor System (React + TypeScript + Tailwind)

Project ini adalah Single Page Application (SPA) yang dibuat khusus untuk challenge:

**"Implementasi Auth Interceptor System dengan Secure Data Fetching & Silent Refresh"**

Dibangun menggunakan:
- React + TypeScript strict mode
- Custom HTTP Client (tanpa axios)
- TailwindCSS
- Mock API (simulasi login, protected route, 401 unauthorized, refresh token, retry request)
- Global Auth Context
- Protected Router + Auto Retry
- Concurrency-safe refresh token queue

---

## 🚀 Fitur Utama

### 1. **Custom HTTP Client**
- Setiap request otomatis menyisipkan **access token** ke header.
- Jika token expired → server merespon **401 Unauthorized**.
- Client otomatis:
  - Melakukan **silent refresh token di background**
  - Melakukan **retry request yang gagal**
  - Tidak mengganggu experience user (tidak logout, tidak blank)

### 2. **Concurrency Handling**
Jika 10 request bersamaan dan semuanya expired:
- Hanya **1 request** yang melakukan refresh token
- 9 request lain **menunggu** refresh selesai
- Setelah sukses → semua request di-retry ulang  
Ini memakai mekanisme **Promise queue**.

### 3. **Mock API Realistis**
- login
- refresh token
- protected `/user/profile`
- auto-expire token setiap 5–10 detik (simulasi real)

### 4. **Global Auth Context**
- login(), logout()
- user state
- auto-restore token dari storage
- auto-refresh background

### 5. **Route Protection**
User tanpa token → redirect ke `/login`.

### 6. **Tailwind UI Minimal**
Clean, no UI library (sesuai aturan challenge).

---

## 📁 Folder Structure

src/
├── api/
│   ├── authApi.ts
│   ├── authService.ts
│   ├── httpClient.ts
│   └── userApi.ts
│
├── auth/
│   ├── AuthContext.tsx
│   ├── AuthProvider.tsx
│   └── useAuth.ts
│
├── components/
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Loading.tsx
│
├── config/
│   ├── constants.ts
│   └── env.ts
│
├── context/
│   ├── GlobalLoadingContext.tsx
│   ├── GlobalLoadingContextValue.ts
│   └── useGlobalLoading.ts
│
├── hooks/
│   ├── useFetch.ts
│   └── useProtectedRoute.ts
│
├── mocks/
│   ├── handlers/
│   │   ├── authHandler.ts
│   │   └── userHandler.ts
│   └── fakeServer.ts
│
├── pages/
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   └── Profile.tsx
│
├── router/
│   └── (File router Anda ada di sini)
│
├── scripts/
│   └── testSilentRefresh.ts
│
├── styles/
│   └── global.css
│
├── types/
│   ├── auth.d.ts
│   ├── common.d.ts
│   ├── types.d.ts
│   └── user.d.ts
│
├── utils/
│   ├── storage.ts
│   ├── token.ts
│   └── tokenParser.ts
│
├── App.tsx
└── main.tsx

---

## 🧪 Cara Menjalankan (Development)

### 1. Clone repo
```sh
git clone https://github.com/ayipmhdd/secure-spa-auth.git
cd secure-spa-auth

### 2. Install Depedencies
npm install

### 3. Jalankan mock API
(Mulai otomatis oleh fakeServer)


### 4. Start project
npm run dev

Aplikasi berjalan di:

http://localhost:5173


---

### Token Flow Overview
Request → attach access token → API
  └─[401 Unauthorized]
       ↓
    Silent Refresh (refresh token)
       ↓
    Update tokens → retry request

---

## 🔑 Akun Login Simulasi:
Username: ayip
Password: 123456

---

👤 Author

Ayip Muhammad
Challenge: SPA Auth Interceptor System