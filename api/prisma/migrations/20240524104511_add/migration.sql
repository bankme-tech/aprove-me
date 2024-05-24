-- CreateTable
CREATE TABLE "Payable" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "emissionDate" TIMESTAMP(3) NOT NULL,
    "assignorId" TEXT NOT NULL,

    CONSTRAINT "Payable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignor" (
    "id" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Assignor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "salt" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Payable_assignorId_idx" ON "Payable"("assignorId");

-- CreateIndex
CREATE INDEX "Assignor_userId_idx" ON "Assignor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Payable" ADD CONSTRAINT "Payable_assignorId_fkey" FOREIGN KEY ("assignorId") REFERENCES "Assignor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignor" ADD CONSTRAINT "Assignor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
