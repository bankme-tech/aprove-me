-- CreateTable
CREATE TABLE "Payable" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "emissionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignorId" VARCHAR(36) NOT NULL,

    CONSTRAINT "Payable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignor" (
    "id" TEXT NOT NULL,
    "document" VARCHAR(30) NOT NULL,
    "email" VARCHAR(140) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "name" VARCHAR(140) NOT NULL,

    CONSTRAINT "Assignor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- AddForeignKey
ALTER TABLE "Payable" ADD CONSTRAINT "Payable_assignorId_fkey" FOREIGN KEY ("assignorId") REFERENCES "Assignor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
