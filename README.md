# Simple E-Commerce Web App

Proyek ini merupakan tugas kuliah berupa pengembangan aplikasi web e-commerce sederhana menggunakan teknologi modern berbasis JavaScript.  
Aplikasi ini memiliki fitur autentikasi pengguna, katalog produk, keranjang belanja, checkout, hingga integrasi pembayaran menggunakan Midtrans.

#

### Tujuan Project

Project ini dibuat untuk:

- Memenuhi Tugas Mata Kuliah Kewirausahaan

---

# Tech Stack

### Frontend
- React + Vite
- TypeScript
- TailwindCSS
- Axios
- React Router DOM
- Phosphor Icons

### Backend
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt

### Payment Gateway
- Midtrans Snap

### Deployment
- Frontend: Vercel
- Backend: Vercel

---

# Fitur Utama

### Authentication
- Register akun
- Login akun
- Autentikasi JWT
- Persist login menggunakan token

### Product
- Menampilkan daftar produk dari database
- Filter produk berdasarkan flavor
- Pagination produk
- Product carousel pada homepage

### Cart
- Tambah produk ke cart
- Update quantity cart
- Hapus item cart
- Menampilkan subtotal otomatis

### Checkout
- Ringkasan pesanan
- Pemilihan metode pengiriman
- Pemilihan metode pembayaran
- Integrasi Midtrans Snap

### Profile
- Menampilkan data user
- Edit data profil pengguna

---

# Instalasi Project

### 1. Clone Repository

```
# frontend
https://github.com/Lyc-n/Simple-E-Commerce.git

# backend
https://github.com/Lyc-n/Backend-Simple-E-Commerce.git
```

### 2. Install Dependencies

#### Frontend

```
cd Simple-E-Commerce
npm install
```

#### Backend

```
cd Backend-Simple-E-Commerce
npm install
```

# Environment Variables

### Frontend .env

```
VITE_API_BASE_URL=
VITE_MIDTRANS_CLIENT_KEY=
VITE_MIDTRANS_IS_PROD=
```

### Backend .env

```
PORT=
FRONTEND_URL=
NODE_ENV=development

MIDTRANS_SERVER_KEY=
MIDTRANS_IS_PROD=

JWT_SECRET=
PRISMA_DATABASE_URL=
```

# Prisma Migration

```
npx prisma migrate dev
npx prisma generate
```

# Menjalankan Project

### Backend

```
npm run dev
```
### Frontend

```
npm run dev
```
