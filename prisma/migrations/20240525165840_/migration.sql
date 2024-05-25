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
CREATE TABLE "Payable" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "emissionDate" DATE NOT NULL,
    "assignor" TEXT NOT NULL,

    CONSTRAINT "Payable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Assignor_email_key" ON "Assignor"("email");

-- AddForeignKey
ALTER TABLE "Payable" ADD CONSTRAINT "Payable_assignor_fkey" FOREIGN KEY ("assignor") REFERENCES "Assignor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
