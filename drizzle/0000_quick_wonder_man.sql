CREATE TABLE `admin_users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`password_hash` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admin_users_email_unique` ON `admin_users` (`email`);--> statement-breakpoint
CREATE TABLE `artworks` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`artist` text NOT NULL,
	`year` integer NOT NULL,
	`technique` text NOT NULL,
	`medium` text,
	`dimensions` text,
	`edition` text,
	`category` text DEFAULT 'Karya' NOT NULL,
	`description` text,
	`images` text,
	`featured` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `artworks_slug_unique` ON `artworks` (`slug`);--> statement-breakpoint
CREATE TABLE `microsites` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`kind` text NOT NULL,
	`title` text NOT NULL,
	`tagline` text,
	`description` text,
	`content` text,
	`hero_image` text,
	`theme_color` text DEFAULT '#FF4D6D' NOT NULL,
	`status` text DEFAULT 'PUBLISHED' NOT NULL,
	`edition` text,
	`location` text,
	`start_date` integer,
	`end_date` integer,
	`is_live_now` integer DEFAULT false NOT NULL,
	`is_headline` integer DEFAULT false NOT NULL,
	`headline_order` integer DEFAULT 0 NOT NULL,
	`cta_label` text,
	`cta_url` text,
	`blocks` text,
	`images` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `microsites_slug_unique` ON `microsites` (`slug`);--> statement-breakpoint
CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`excerpt` text,
	`content` text,
	`cover_image` text,
	`category` text DEFAULT 'Umum' NOT NULL,
	`microsite_id` text,
	`published` integer DEFAULT true NOT NULL,
	`published_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`microsite_id`) REFERENCES `microsites`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `posts_slug_unique` ON `posts` (`slug`);--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`price` integer NOT NULL,
	`compare_price` integer,
	`stock` integer DEFAULT 0 NOT NULL,
	`category` text DEFAULT 'Merchandise' NOT NULL,
	`images` text,
	`is_featured` integer DEFAULT false NOT NULL,
	`is_available` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);