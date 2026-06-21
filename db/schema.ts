import { relations } from "drizzle-orm";
import {
  date,
  boolean,
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
export const donationPaymentMethod = pgEnum("donation_payment_method", ["qris", "bank_transfer", "ewallet"]);
export const donationStatus = pgEnum("donation_status", ["pending", "verified", "cancelled"]);

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

export const donationPrograms = pgTable(
  "donation_programs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 160 }).notNull(),
    slug: varchar("slug", { length: 200 }).notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url"),
    targetAmount: numeric("target_amount", { precision: 14, scale: 2 }).notNull(),
    collectedAmount: numeric("collected_amount", { precision: 14, scale: 2 }).default("0").notNull(),
    donorsCount: integer("donors_count").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("donation_programs_slug_idx").on(table.slug),
    index("donation_programs_is_active_idx").on(table.isActive),
  ],
);

export const donations = pgTable(
  "donations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    programId: uuid("program_id").references(() => donationPrograms.id, { onDelete: "set null", onUpdate: "cascade" }),
    purpose: varchar("purpose", { length: 160 }).notNull(),
    donorName: varchar("donor_name", { length: 120 }).notNull(),
    amount: numeric("amount", { precision: 14, scale: 2 }).notNull(),
    whatsapp: varchar("whatsapp", { length: 32 }).notNull(),
    message: text("message"),
    paymentMethod: donationPaymentMethod("payment_method").notNull(),
    status: donationStatus("status").default("pending").notNull(),
    isAnonymous: boolean("is_anonymous").default(false).notNull(),
    donatedAt: timestamp("donated_at", { withTimezone: true }).defaultNow().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("donations_program_id_idx").on(table.programId),
    index("donations_status_idx").on(table.status),
    index("donations_donated_at_idx").on(table.donatedAt),
  ],
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

export const donationProgramsRelations = relations(donationPrograms, ({ many }) => ({
  donations: many(donations),
}));

export const donationsRelations = relations(donations, ({ one }) => ({
  program: one(donationPrograms, {
    fields: [donations.programId],
    references: [donationPrograms.id],
  }),
}));
