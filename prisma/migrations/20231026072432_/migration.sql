-- CreateTable
CREATE TABLE "userBicyrent" (
    "id" SERIAL NOT NULL,
    "googleId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT,
    "email" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "userBicyrent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userBicyrent_googleId_key" ON "userBicyrent"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "userBicyrent_email_key" ON "userBicyrent"("email");
