import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;
const adminEmail = process.env.ADMIN_EMAIL ?? "admin@mesjid.tes";

if (!connectionString) {
  console.error("Set DATABASE_URL sebelum menjalankan seed data.");
  process.exit(1);
}

const sql = postgres(connectionString, { ssl: "require", prepare: false });

const [admin] = await sql`
  select id
  from users
  where email = ${adminEmail}
  limit 1
`;

if (!admin) {
  console.error(`Admin ${adminEmail} belum ada. Jalankan seed admin dulu.`);
  await sql.end();
  process.exit(1);
}

const createdBy = admin.id;

const kasMasuk = [
  ["2026-05-01", "Infak Jumat", "Kotak infak sholat Jumat pekan pertama", "2500000.00"],
  ["2026-05-03", "Donatur Tetap", "Donasi rutin jamaah", "1750000.00"],
  ["2026-05-05", "Infak Subuh", "Infak jamaah subuh berjamaah", "620000.00"],
  ["2026-05-07", "Wakaf Al-Qur'an", "Titipan wakaf mushaf", "980000.00"],
  ["2026-05-09", "Infak Jumat", "Kotak infak sholat Jumat pekan kedua", "2810000.00"],
  ["2026-05-11", "Donasi Online", "Transfer rekening mesjid", "1350000.00"],
  ["2026-05-13", "Program Sosial", "Titipan santunan jamaah", "2100000.00"],
  ["2026-05-15", "Infak Kajian", "Infak kajian bada maghrib", "740000.00"],
  ["2026-05-16", "Donatur Usaha", "Dukungan operasional bulanan", "3200000.00"],
  ["2026-05-17", "Infak Harian", "Infak jamaah harian", "510000.00"],
];

const kasKeluar = [
  ["2026-05-02", "Listrik", "Pembayaran listrik mesjid", "820000.00"],
  ["2026-05-04", "Kebersihan", "Peralatan kebersihan", "340000.00"],
  ["2026-05-06", "Operasional", "Konsumsi rapat pengurus", "470000.00"],
  ["2026-05-08", "Sound System", "Servis mikrofon imam", "650000.00"],
  ["2026-05-10", "Sosial", "Santunan warga sekitar", "1500000.00"],
  ["2026-05-12", "Air", "Tagihan air dan wudhu", "390000.00"],
  ["2026-05-13", "TPA", "Buku belajar santri", "560000.00"],
  ["2026-05-14", "Perawatan", "Perbaikan lampu teras", "730000.00"],
  ["2026-05-16", "Kajian", "Honor narasumber kajian", "900000.00"],
  ["2026-05-17", "Administrasi", "ATK dan fotokopi laporan", "210000.00"],
];

const kegiatan = [
  ["Kajian Bada Maghrib", "kajian-bada-maghrib-20260517", "Kajian rutin bada maghrib bersama ustaz tamu untuk jamaah umum.", "2026-05-17 19:30:00+07", null, "Ruang utama mesjid", "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=900&q=80"],
  ["Tahsin Remaja", "tahsin-remaja-20260518", "Kelas tahsin untuk remaja masjid dengan materi makharijul huruf dan praktik bacaan.", "2026-05-18 08:00:00+07", "2026-05-18 10:00:00+07", "Aula mesjid", "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=900&q=80"],
  ["Santunan Anak Yatim", "santunan-anak-yatim-20260520", "Penyaluran amanah donatur untuk anak yatim dan keluarga dhuafa sekitar masjid.", "2026-05-20 16:00:00+07", "2026-05-20 17:30:00+07", "Halaman mesjid", "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=80"],
  ["Subuh Berjamaah", "subuh-berjamaah-20260521", "Gerakan subuh berjamaah dilanjutkan tausiyah singkat dan sarapan bersama.", "2026-05-21 04:45:00+07", null, "Ruang utama mesjid", "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=900&q=80"],
  ["Gotong Royong", "gotong-royong-20260524", "Kerja bakti membersihkan area masjid, halaman, tempat wudhu, dan ruang belajar.", "2026-05-24 07:00:00+07", "2026-05-24 10:00:00+07", "Area mesjid", "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"],
];

const galeri = [
  ["Kajian Maghrib", "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=900&q=80", "image/jpeg", 524288],
  ["Sholat Berjamaah", "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=900&q=80", "image/jpeg", 498123],
  ["Kegiatan TPA", "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=900&q=80", "image/jpeg", 612300],
  ["Program Sosial", "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=80", "image/jpeg", 587440],
  ["Dokumentasi Mesjid", "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=900&q=80", "image/jpeg", 701120],
];

const jadwal = [
  ["2026-05-18", "04:31", "04:41", "05:55", "06:19", "12:10", "15:33", "18:13", "19:24"],
  ["2026-05-19", "04:31", "04:41", "05:55", "06:19", "12:10", "15:33", "18:13", "19:24"],
  ["2026-05-20", "04:31", "04:41", "05:55", "06:19", "12:10", "15:33", "18:13", "19:24"],
];

await sql.begin(async (tx) => {
  for (const item of kasMasuk) {
    await tx`
      insert into kas_masuk (tanggal, sumber, keterangan, jumlah, created_by)
      values (${item[0]}, ${item[1]}, ${item[2]}, ${item[3]}, ${createdBy})
    `;
  }

  for (const item of kasKeluar) {
    await tx`
      insert into kas_keluar (tanggal, kategori, keterangan, jumlah, created_by)
      values (${item[0]}, ${item[1]}, ${item[2]}, ${item[3]}, ${createdBy})
    `;
  }

  for (const item of kegiatan) {
    await tx`
      insert into kegiatan (judul, slug, deskripsi, tanggal_mulai, tanggal_selesai, lokasi, gambar_url, created_by)
      values (${item[0]}, ${item[1]}, ${item[2]}, ${item[3]}, ${item[4]}, ${item[5]}, ${item[6]}, ${createdBy})
      on conflict (slug) do update set
        judul = excluded.judul,
        deskripsi = excluded.deskripsi,
        tanggal_mulai = excluded.tanggal_mulai,
        tanggal_selesai = excluded.tanggal_selesai,
        lokasi = excluded.lokasi,
        gambar_url = excluded.gambar_url
    `;
  }

  for (const item of galeri) {
    await tx`
      insert into galeri (judul, gambar_url, mime_type, size, created_by)
      values (${item[0]}, ${item[1]}, ${item[2]}, ${item[3]}, ${createdBy})
    `;
  }

  for (const item of jadwal) {
    await tx`
      insert into jadwal_sholat_cache (tanggal, imsak, subuh, terbit, dhuha, dzuhur, ashar, maghrib, isya)
      values (${item[0]}, ${item[1]}, ${item[2]}, ${item[3]}, ${item[4]}, ${item[5]}, ${item[6]}, ${item[7]}, ${item[8]})
      on conflict (tanggal) do update set
        imsak = excluded.imsak,
        subuh = excluded.subuh,
        terbit = excluded.terbit,
        dhuha = excluded.dhuha,
        dzuhur = excluded.dzuhur,
        ashar = excluded.ashar,
        maghrib = excluded.maghrib,
        isya = excluded.isya,
        fetched_at = now()
    `;
  }
});

const [counts] = await sql`
  select
    (select count(*)::int from users) as users,
    (select count(*)::int from kas_masuk) as kas_masuk,
    (select count(*)::int from kas_keluar) as kas_keluar,
    (select count(*)::int from kegiatan) as kegiatan,
    (select count(*)::int from galeri) as galeri,
    (select count(*)::int from jadwal_sholat_cache) as jadwal_sholat_cache
`;

await sql.end();
console.log(JSON.stringify(counts, null, 2));
