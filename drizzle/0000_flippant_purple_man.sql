CREATE TABLE "admin_users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admin_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "artworks" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"artist" text NOT NULL,
	"year" integer NOT NULL,
	"technique" text NOT NULL,
	"medium" text,
	"dimensions" text,
	"edition" text,
	"category" text DEFAULT 'Karya' NOT NULL,
	"description" text,
	"images" text,
	"featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "artworks_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "microsites" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"kind" text NOT NULL,
	"title" text NOT NULL,
	"tagline" text,
	"description" text,
	"content" text,
	"hero_image" text,
	"theme_color" text DEFAULT '#FF4D6D' NOT NULL,
	"status" text DEFAULT 'PUBLISHED' NOT NULL,
	"edition" text,
	"location" text,
	"start_date" timestamp,
	"end_date" timestamp,
	"is_live_now" boolean DEFAULT false NOT NULL,
	"is_headline" boolean DEFAULT false NOT NULL,
	"headline_order" integer DEFAULT 0 NOT NULL,
	"cta_label" text,
	"cta_url" text,
	"blocks" text,
	"images" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "microsites_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"excerpt" text,
	"content" text,
	"cover_image" text,
	"category" text DEFAULT 'Umum' NOT NULL,
	"microsite_id" text,
	"published" boolean DEFAULT true NOT NULL,
	"published_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"price" integer NOT NULL,
	"compare_price" integer,
	"stock" integer DEFAULT 0 NOT NULL,
	"category" text DEFAULT 'Merchandise' NOT NULL,
	"images" text,
	"is_featured" boolean DEFAULT false NOT NULL,
	"is_available" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_microsite_id_microsites_id_fk" FOREIGN KEY ("microsite_id") REFERENCES "public"."microsites"("id") ON DELETE set null ON UPDATE no action;