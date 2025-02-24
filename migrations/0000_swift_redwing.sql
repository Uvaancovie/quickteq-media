CREATE TABLE "deliveries" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"courier" varchar(50) DEFAULT 'the_courier_guy' NOT NULL,
	"tracking_number" varchar(255),
	"status" varchar(50) DEFAULT 'in_transit',
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"total_amount" numeric(10, 2) NOT NULL,
	"payment_status" varchar(50) DEFAULT 'pending' NOT NULL,
	"delivery_status" varchar(50) DEFAULT 'not_shipped' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"brand" varchar(100),
	"model" varchar(100),
	"price" numeric(10, 2) NOT NULL,
	"stock" integer DEFAULT 0 NOT NULL,
	"ram" varchar(50),
	"processor" varchar(100),
	"image_url" text,
	"is_special" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"role" varchar(50) DEFAULT 'customer' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
