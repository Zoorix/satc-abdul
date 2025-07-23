CREATE TABLE "Session" (
	"id" text PRIMARY KEY NOT NULL,
	"shop" text NOT NULL,
	"state" text NOT NULL,
	"isOnline" boolean DEFAULT false NOT NULL,
	"scope" text,
	"expires" timestamp(3),
	"accessToken" text,
	"userId" bigint,
	"accountOwner" boolean DEFAULT false NOT NULL,
	"collaborator" boolean DEFAULT false,
	"email" text,
	"emailVerified" boolean DEFAULT false,
	"firstName" text,
	"lastName" text,
	"locale" text
);
