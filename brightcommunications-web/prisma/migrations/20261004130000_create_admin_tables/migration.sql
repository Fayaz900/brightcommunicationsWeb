CREATE TABLE IF NOT EXISTS "ContactSubmission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "service" TEXT,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'UNREAD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "email" TEXT NOT NULL DEFAULT 'hello@brightcommunications.com',
    "phone" TEXT NOT NULL DEFAULT '+91 XXXXX XXXXX',
    "whatsapp" TEXT NOT NULL DEFAULT '+91 XXXXX XXXXX',
    "location" TEXT NOT NULL DEFAULT 'Kochi, Kerala',
    "linkedinUrl" TEXT NOT NULL DEFAULT '',
    "instagramUrl" TEXT NOT NULL DEFAULT '',
    "facebookUrl" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);
