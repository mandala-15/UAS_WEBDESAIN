CREATE TYPE "public"."user_role" AS ENUM('admin');--> statement-breakpoint
CREATE TABLE "galeri" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"judul" varchar(180) NOT NULL,
	"gambar_url" text NOT NULL,
	"mime_type" varchar(80) NOT NULL,
	"size" integer NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jadwal_sholat_cache" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"wilayah" varchar(120) DEFAULT 'Kota Pekanbaru' NOT NULL,
	"provinsi" varchar(120) DEFAULT 'Riau' NOT NULL,
	"tanggal" date NOT NULL,
	"imsak" time NOT NULL,
	"subuh" time NOT NULL,
	"terbit" time NOT NULL,
	"dhuha" time NOT NULL,
	"dzuhur" time NOT NULL,
	"ashar" time NOT NULL,
	"maghrib" time NOT NULL,
	"isya" time NOT NULL,
	"fetched_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "kas_keluar" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tanggal" date NOT NULL,
	"kategori" varchar(120) NOT NULL,
	"keterangan" text NOT NULL,
	"jumlah" numeric(14, 2) NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "kas_masuk" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tanggal" date NOT NULL,
	"sumber" varchar(120) NOT NULL,
	"keterangan" text NOT NULL,
	"jumlah" numeric(14, 2) NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "kegiatan" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"judul" varchar(180) NOT NULL,
	"slug" varchar(220) NOT NULL,
	"deskripsi" text NOT NULL,
	"tanggal_mulai" timestamp with time zone NOT NULL,
	"tanggal_selesai" timestamp with time zone,
	"lokasi" varchar(180) NOT NULL,
	"gambar_url" text,
	"created_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(120) NOT NULL,
	"email" varchar(160) NOT NULL,
	"password_hash" text NOT NULL,
	"role" "user_role" DEFAULT 'admin' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "galeri" ADD CONSTRAINT "galeri_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "kas_keluar" ADD CONSTRAINT "kas_keluar_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "kas_masuk" ADD CONSTRAINT "kas_masuk_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "kegiatan" ADD CONSTRAINT "kegiatan_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "galeri_created_at_idx" ON "galeri" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "galeri_created_by_idx" ON "galeri" USING btree ("created_by");--> statement-breakpoint
CREATE UNIQUE INDEX "jadwal_sholat_cache_tanggal_idx" ON "jadwal_sholat_cache" USING btree ("tanggal");--> statement-breakpoint
CREATE INDEX "kas_keluar_tanggal_idx" ON "kas_keluar" USING btree ("tanggal");--> statement-breakpoint
CREATE INDEX "kas_keluar_created_by_idx" ON "kas_keluar" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "kas_masuk_tanggal_idx" ON "kas_masuk" USING btree ("tanggal");--> statement-breakpoint
CREATE INDEX "kas_masuk_created_by_idx" ON "kas_masuk" USING btree ("created_by");--> statement-breakpoint
CREATE UNIQUE INDEX "kegiatan_slug_idx" ON "kegiatan" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "kegiatan_tanggal_mulai_idx" ON "kegiatan" USING btree ("tanggal_mulai");--> statement-breakpoint
CREATE INDEX "kegiatan_created_by_idx" ON "kegiatan" USING btree ("created_by");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");