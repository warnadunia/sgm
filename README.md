# Studio Grafis Minggiran — Website Full-Stack

Website resmi **Studio Grafis Minggiran (SGM)**, studio cetak & ruang kolektif seni grafis di Minggiran, Sleman, Yogyakarta. Dibangun dengan **Next.js (App Router) + Drizzle ORM + libSQL + Vercel Blob**, siap di-deploy ke **Vercel** dari **GitHub**.

![Stack](https://img.shields.io/badge/Next.js-15-black) ![Stack](https://img.shields.io/badge/Drizzle-ORM-green) ![Stack](https://img.shields.io/badge/Storage-Vercel%20Blob-blue)

---

## Fitur

| Area | Keterangan |
| --- | --- |
| 🏠 **Landing page** | Hero risograf, marquee, section program/event, arsip unggulan, artshop, kabar terbaru |
| ⭐ **Headline microsite** | Microsite mana pun bisa dijadikan **section khusus (spotlight)** di landing — diatur dari admin (toggle *Headline*) |
| 🎪 **Microsite Program & Event** | Residensi, Workshop, **Print Parade**, **Pekan Seni Grafis Yogyakarta** — tiap microsite punya hero, tema warna, blok konten fleksibel (jadwal, partisipan, info tiket, galeri) |
| 🔴 **Mode LIVE event** | Saat event berlangsung, aktifkan toggle *Live* — spanduk *"informasi resmi hanya di microsite ini"* menyala di landing & microsite |
| 🗄️ **Arsip & Katalog Karya** | Galeri arsip dengan filter teknik/tahun/kategori + halaman detail per karya |
| 🛍️ **Artshop & Merchandise** | Detail produk ala e-commerce: **multi-foto dengan thumbnail gallery**, harga coret, stok, kategori, tombol **Pesan via WhatsApp** |
| 📰 **Blog (News & Update)** | Tulisan bisa **terhubung ke microsite** (kartu tautan otomatis) atau berdiri sebagai **informasi umum** |
| 🔐 **Admin CMS** | `/admin` — kelola microsite (editor blok konten), karya, produk (multi-upload gambar), dan blog |

## Stack

- **Framework**: Next.js 15 (App Router, Server Components, Server Actions)
- **Database**: libSQL/SQLite via **Drizzle ORM** — lokal memakai file SQLite, production memakai **Turso** (serverless-friendly, tanpa binary engine)
- **Storage gambar**: **Vercel Blob** di production, fallback folder lokal `public/uploads` saat dev
- **Auth**: cookie session HMAC (scrypt password hash) — tanpa dependency berat
- **Styling**: Tailwind CSS v4 + font self-hosted (Fontsource) + Framer Motion + Lenis smooth scroll

---

## Menjalankan Lokal

```bash
npm install
cp .env.example .env        # sesuaikan bila perlu
npm run db:migrate          # buat tabel (migrasi ada di folder ./drizzle)
npm run db:seed             # isi konten demo (microsite, karya, produk, blog)
npm run dev
```

Buka <http://localhost:3000>. Admin: <http://localhost:3000/admin>

- **Email**: `admin@studiografisminggiran.id`
- **Sandi**: `minggiran2026` *(ganti di `.env` sebelum production)*

### Script penting

| Perintah | Fungsi |
| --- | --- |
| `npm run db:generate` | Buat migrasi SQL baru setelah mengubah `src/db/schema.ts` |
| `npm run db:migrate` | Terapkan migrasi ke database `DATABASE_URL` |
| `npm run db:seed` | Isi ulang konten demo |
| `npm run db:studio` | Drizzle Studio (penjelajah DB GUI) |

> Migrasi juga **otomatis diterapkan saat server start** lewat `src/instrumentation.ts`, plus akun admin dibuat bila belum ada — jadi deploy baru langsung siap pakai.

---

## Deploy ke Vercel (GitHub → Vercel → Turso → Blob)

### 1. GitHub
Repo ini sudah siap push. Vercel akan membaca branch yang dipilih saat import.

### 2. Database production — Turso
1. Buat database gratis di [turso.tech](https://turso.tech) (atau lewat integrasi Turso di Vercel Marketplace).
2. Ambil **Database URL** (`libsql://…`) dan **Auth Token**.

### 3. Import repo di Vercel
1. **Add New → Project → Import** dari GitHub repo ini.
2. Framework terdeteksi otomatis: Next.js. Biarkan build command default.

### 4. Environment Variables (Project → Settings → Environment Variables)

| Variabel | Nilai |
| --- | --- |
| `DATABASE_URL` | `libsql://db-kamu.turso.io` |
| `DATABASE_AUTH_TOKEN` | token dari Turso |
| `SESSION_SECRET` | string acak panjang (mis. `openssl rand -hex 32`) |
| `ADMIN_EMAIL` | email admin pertama |
| `ADMIN_PASSWORD` | sandi admin pertama |
| `NEXT_PUBLIC_WA_NUMBER` | nomor WA artshop, mis. `6281234567890` |
| `BLOB_READ_WRITE_TOKEN` | **otomatis terisi** saat Blob store dihubungkan (langkah 5) |

### 5. Vercel Blob (penyimpanan gambar)
1. Dashboard project → tab **Storage → Create Database → Blob**.
2. Hubungkan store ke project — variabel `BLOB_READ_WRITE_TOKEN` terisi otomatis.
3. Semua upload dari admin kini masuk ke Blob. (Tanpa store ini, upload masih jalan di lokal ke `public/uploads`.)

### 6. Isi konten awal (opsional)
Migrasi tabel & akun admin dibuat otomatis saat server Vercel pertama kali jalan. Untuk mengisi konten demo, jalankan dari komputer lokal dengan env production:

```bash
DATABASE_URL="libsql://..." DATABASE_AUTH_TOKEN="..." npm run db:seed
```

---

## Struktur Kode

```
├── drizzle/                  # migrasi SQL (ter-commit, diterapkan otomatis)
├── public/images/seed/       # gambar konten demo
├── src/
│   ├── app/
│   │   ├── page.tsx          # landing (+ section headline microsite)
│   │   ├── program/[slug]/   # microsite program
│   │   ├── event/[slug]/     # microsite event
│   │   ├── arsip/            # galeri & katalog (filter) + detail karya
│   │   ├── artshop/          # etalase + detail produk multi-foto
│   │   ├── blog/             # kabar + artikel (kartu microsite terhubung)
│   │   ├── tentang/          # profil studio
│   │   ├── admin/            # CMS terproteksi sesi
│   │   ├── api/admin/upload  # upload → Vercel Blob / fallback lokal
│   │   └── uploads/[name]/   # serving file fallback lokal
│   ├── components/ site|admin|motion
│   ├── db/                   # schema, client libSQL, migrasi, seed, ensure-admin
│   └── lib/                  # session, utils, blok konten, queries, actions
└── src/instrumentation.ts    # migrasi otomatis + admin awal saat server start
```

## Catatan teknis

- **Mengapa Drizzle + libSQL?** Prisma membutuhkan unduhan binary engine eksternal; Drizzle + libSQL murni JavaScript — lebih ringan di serverless dan tanpa native dependency.
- **Mode LIVE & privasi info event**: event yang live (`isLiveNow`) menampilkan penanda bahwa informasi resmi *hanya* diterbitkan di microsite — cocok untuk mengarahkan publik ke satu kanal saat penyelenggaraan.
- **Multi-gambar produk**: kolom `images` menyimpan array URL; kartu produk menampilkan foto kedua saat hover, halaman detail punya galeri thumbnail.
