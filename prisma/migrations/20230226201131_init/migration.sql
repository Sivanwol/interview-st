-- CreateEnum
CREATE TYPE "tableType" AS ENUM ('Bar', 'SmallTable', 'MedTable', 'LargeTable');

-- CreateTable
CREATE TABLE "RestTable" (
    "id" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "type" "tableType" NOT NULL DEFAULT 'Bar',
    "holdTableAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RestTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slots" (
    "id" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "totalSlots" INTEGER NOT NULL DEFAULT 1,
    "registerAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sitAt" TIMESTAMP(3),
    "leaveAt" TIMESTAMP(3),
    "cancelAt" TIMESTAMP(3),

    CONSTRAINT "Slots_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Slots" ADD CONSTRAINT "Slots_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "RestTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
