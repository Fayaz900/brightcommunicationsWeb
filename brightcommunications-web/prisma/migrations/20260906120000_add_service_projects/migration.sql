CREATE TABLE "ServiceProject" (
    "id" TEXT NOT NULL,
    "serviceNum" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "backgroundImage" TEXT,
    "projectBrief" TEXT NOT NULL,
    "galleryImages" TEXT[],
    "youtubeUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceProject_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ServiceProject_serviceNum_key" ON "ServiceProject"("serviceNum");
CREATE UNIQUE INDEX "ServiceProject_slug_key" ON "ServiceProject"("slug");