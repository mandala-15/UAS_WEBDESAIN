CREATE TYPE "public"."donation_payment_method" AS ENUM('qris', 'bank_transfer', 'ewallet');--> statement-breakpoint
CREATE TYPE "public"."donation_status" AS ENUM('pending', 'verified', 'cancelled');--> statement-breakpoint
CREATE TABLE "donation_programs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(160) NOT NULL,
	"slug" varchar(200) NOT NULL,
	"description" text NOT NULL,
	"image_url" text,
	"target_amount" numeric(14, 2) NOT NULL,
	"collected_amount" numeric(14, 2) DEFAULT '0' NOT NULL,
	"donors_count" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "donations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"program_id" uuid,
	"purpose" varchar(160) NOT NULL,
	"donor_name" varchar(120) NOT NULL,
	"amount" numeric(14, 2) NOT NULL,
	"whatsapp" varchar(32) NOT NULL,
	"message" text,
	"payment_method" "donation_payment_method" NOT NULL,
	"status" "donation_status" DEFAULT 'pending' NOT NULL,
	"is_anonymous" boolean DEFAULT false NOT NULL,
	"donated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "donations" ADD CONSTRAINT "donations_program_id_donation_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."donation_programs"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "donation_programs_slug_idx" ON "donation_programs" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "donation_programs_is_active_idx" ON "donation_programs" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "donations_program_id_idx" ON "donations" USING btree ("program_id");--> statement-breakpoint
CREATE INDEX "donations_status_idx" ON "donations" USING btree ("status");--> statement-breakpoint
CREATE INDEX "donations_donated_at_idx" ON "donations" USING btree ("donated_at");--> statement-breakpoint
INSERT INTO "donation_programs" ("name", "slug", "description", "image_url", "target_amount", "collected_amount", "donors_count")
VALUES
	('Renovasi Masjid', 'renovasi-masjid', 'Dukungan renovasi fasilitas utama masjid agar lebih nyaman untuk jamaah.', 'https://images.unsplash.com/photo-1574246604907-db69e30ddb97?auto=format&fit=crop&w=900&q=80', '20000000', '15500000', 186),
	('Operasional Masjid', 'operasional-masjid', 'Pembiayaan listrik, kebersihan, perawatan, dan kebutuhan operasional harian.', 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=900&q=80', '12000000', '7850000', 124),
	('Santunan Anak Yatim', 'santunan-anak-yatim', 'Program santunan dan pembinaan untuk anak yatim serta dhuafa sekitar masjid.', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80', '15000000', '10750000', 143),
	('Pendidikan TPA', 'pendidikan-tpa', 'Dukungan kelas Al-Quran, tahsin, dan kegiatan belajar santri TPA.', 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=900&q=80', '10000000', '4200000', 78),
	('Jumat Berkah', 'jumat-berkah', 'Paket makanan dan sedekah Jumat untuk jamaah serta masyarakat sekitar.', 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=900&q=80', '8000000', '5100000', 96),
	('Wakaf Masjid', 'wakaf-masjid', 'Program wakaf produktif untuk fasilitas ibadah dan pelayanan jangka panjang.', 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=900&q=80', '50000000', '18500000', 211)
ON CONFLICT ("slug") DO NOTHING;
