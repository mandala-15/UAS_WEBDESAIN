import { relations } from "drizzle-orm";
import {
  date,
  integer,
  numeric,
  pgEnum,
  pgTable,
  index,
  text,
  time,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["admin"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  passwordHash: text("password_hash").notNull(),
  role: userRole("role").default("admin").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex("users_email_idx").on(table.email)]);

export const kasMasuk = pgTable(
  "kas_masuk",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tanggal: date("tanggal").notNull(),
    sumber: varchar("sumber", { length: 120 }).notNull(),
    keterangan: text("keterangan").notNull(),
    jumlah: numeric("jumlah", { precision: 14, scale: 2 }).notNull(),
    createdBy: uuid("created_by")
      .references(() => users.id, { onDelete: "restrict", onUpdate: "cascade" })
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("kas_masuk_tanggal_idx").on(table.tanggal),
    index("kas_masuk_created_by_idx").on(table.createdBy),
  ],
);

export const kasKeluar = pgTable(
  "kas_keluar",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tanggal: date("tanggal").notNull(),
    kategori: varchar("kategori", { length: 120 }).notNull(),
    keterangan: text("keterangan").notNull(),
    jumlah: numeric("jumlah", { precision: 14, scale: 2 }).notNull(),
    createdBy: uuid("created_by")
      .references(() => users.id, { onDelete: "restrict", onUpdate: "cascade" })
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("kas_keluar_tanggal_idx").on(table.tanggal),
    index("kas_keluar_created_by_idx").on(table.createdBy),
  ],
);

export const kegiatan = pgTable(
  "kegiatan",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    judul: varchar("judul", { length: 180 }).notNull(),
    slug: varchar("slug", { length: 220 }).notNull(),
    deskripsi: text("deskripsi").notNull(),
    tanggalMulai: timestamp("tanggal_mulai", { withTimezone: true }).notNull(),
    tanggalSelesai: timestamp("tanggal_selesai", { withTimezone: true }),
    lokasi: varchar("lokasi", { length: 180 }).notNull(),
    gambarUrl: text("gambar_url"),
    createdBy: uuid("created_by")
      .references(() => users.id, { onDelete: "restrict", onUpdate: "cascade" })
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("kegiatan_slug_idx").on(table.slug),
    index("kegiatan_tanggal_mulai_idx").on(table.tanggalMulai),
    index("kegiatan_created_by_idx").on(table.createdBy),
  ],
);

export const galeri = pgTable(
  "galeri",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    judul: varchar("judul", { length: 180 }).notNull(),
    gambarUrl: text("gambar_url").notNull(),
    mimeType: varchar("mime_type", { length: 80 }).notNull(),
    size: integer("size").notNull(),
    createdBy: uuid("created_by")
      .references(() => users.id, { onDelete: "restrict", onUpdate: "cascade" })
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("galeri_created_at_idx").on(table.createdAt),
    index("galeri_created_by_idx").on(table.createdBy),
  ],
);

export const jadwalSholatCache = pgTable(
  "jadwal_sholat_cache",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    wilayah: varchar("wilayah", { length: 120 }).default("Kota Pekanbaru").notNull(),
    provinsi: varchar("provinsi", { length: 120 }).default("Riau").notNull(),
    tanggal: date("tanggal").notNull(),
    imsak: time("imsak").notNull(),
    subuh: time("subuh").notNull(),
    terbit: time("terbit").notNull(),
    dhuha: time("dhuha").notNull(),
    dzuhur: time("dzuhur").notNull(),
    ashar: time("ashar").notNull(),
    maghrib: time("maghrib").notNull(),
    isya: time("isya").notNull(),
    fetchedAt: timestamp("fetched_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [uniqueIndex("jadwal_sholat_cache_tanggal_idx").on(table.tanggal)],
);

export const usersRelations = relations(users, ({ many }) => ({
  kasMasuk: many(kasMasuk),
  kasKeluar: many(kasKeluar),
  kegiatan: many(kegiatan),
  galeri: many(galeri),
}));

export const kasMasukRelations = relations(kasMasuk, ({ one }) => ({
  creator: one(users, {
    fields: [kasMasuk.createdBy],
    references: [users.id],
  }),
}));

export const kasKeluarRelations = relations(kasKeluar, ({ one }) => ({
  creator: one(users, {
    fields: [kasKeluar.createdBy],
    references: [users.id],
  }),
}));

export const kegiatanRelations = relations(kegiatan, ({ one }) => ({
  creator: one(users, {
    fields: [kegiatan.createdBy],
    references: [users.id],
  }),
}));

export const galeriRelations = relations(galeri, ({ one }) => ({
  creator: one(users, {
    fields: [galeri.createdBy],
    references: [users.id],
  }),
}));
