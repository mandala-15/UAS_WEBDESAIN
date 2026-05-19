# Manajemen Kas Mesjid + Portal Mesjid

Project Next.js App Router untuk portal mesjid dan dashboard admin kas. Stack utama:

- Next.js 16 + TypeScript
- Supabase PostgreSQL + Supabase Storage
- Drizzle ORM
- Zod validation
- JWT auth via secure cookies
- bcryptjs password hashing
- DOMPurify sanitasi input
- Flatpickr, TanStack Table, Chart.js

## Menjalankan Lokal

```bash
npm install
cp .env.example .env.local
npm run dev
```

Buka `http://localhost:3000`.

## Environment

Isi `.env.local`:

```env
DATABASE_URL="postgresql://postgres.xxxxx:password@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
JWT_SECRET="ganti-dengan-string-random-minimal-32-karakter"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="xxxxx"
SUPABASE_SERVICE_ROLE_KEY="xxxxx"
```

## Database

Generate dan jalankan migration:

```bash
npm run db:generate
npm run db:migrate
```

Buat admin pertama:

```bash
$env:ADMIN_EMAIL="admin@mesjid.test"
$env:ADMIN_PASSWORD="password-admin-kuat"
$env:ADMIN_NAME="Admin Mesjid"
npm run seed:admin
```

## Supabase Storage

Buat bucket bernama `masjid-assets`. Untuk portal publik, bucket bisa dibuat public. Upload tetap dijalankan server-side memakai `SUPABASE_SERVICE_ROLE_KEY` dan validasi:

- MIME: JPEG, PNG, WEBP
- Maksimal 2MB
- Nama file diacak

## Route Penting

- `/` portal publik
- `/login` login admin
- `/dashboard` ringkasan kas
- `/dashboard/kas-masuk`
- `/dashboard/kas-keluar`
- `/dashboard/laporan`
- `/dashboard/kegiatan`
- `/dashboard/galeri`
- `/api/jadwal-sholat` jadwal sholat Pekanbaru dari EQuran.id

## Keamanan

- Query database memakai Drizzle agar parameterized dan aman dari SQL injection.
- Semua endpoint mutasi mengecek JWT session dari cookie HTTP-only.
- Password disimpan dengan bcrypt.
- Cookie memakai `httpOnly`, `sameSite=lax`, dan `secure` di production.
- Expiry JWT/cookie dihitung sampai jam 00:00.
- Input disanitasi dengan DOMPurify dan divalidasi dengan Zod.

## Deploy Vercel

1. Push repository ke GitHub.
2. Import project di Vercel.
3. Tambahkan environment variables production.
4. Jalankan `npm run db:migrate` dengan `DATABASE_URL` Supabase.
5. Deploy.

Untuk domain `.my.id`, tambahkan domain di Vercel lalu arahkan DNS provider:

- `A` root domain ke IP Vercel.
- `CNAME` `www` ke `cname.vercel-dns.com`.

