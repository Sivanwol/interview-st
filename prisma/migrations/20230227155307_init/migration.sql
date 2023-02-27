-- CreateEnum
CREATE TYPE "tableType" AS ENUM ('Bar', 'SmallTable', 'MedTable', 'LargeTable');

-- CreateTable
CREATE TABLE "tables" (
    "id" TEXT NOT NULL,
    "type" "tableType" NOT NULL DEFAULT 'Bar',
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "id" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "registerAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sitAt" TIMESTAMP(3),
    "leaveAt" TIMESTAMP(3),
    "cancelAt" TIMESTAMP(3),

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "tables"("id") ON DELETE CASCADE ON UPDATE CASCADE;
