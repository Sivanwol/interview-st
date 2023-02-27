/*
  Warnings:

  - You are about to drop the column `cancelAt` on the `Slots` table. All the data in the column will be lost.
  - You are about to drop the column `leaveAt` on the `Slots` table. All the data in the column will be lost.
  - You are about to drop the column `registerAt` on the `Slots` table. All the data in the column will be lost.
  - You are about to drop the column `sitAt` on the `Slots` table. All the data in the column will be lost.
  - You are about to drop the column `totalSlots` on the `Slots` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Slots" DROP COLUMN "cancelAt",
DROP COLUMN "leaveAt",
DROP COLUMN "registerAt",
DROP COLUMN "sitAt",
DROP COLUMN "totalSlots",
ADD COLUMN     "reservationAt" TIMESTAMP(3),
ADD COLUMN     "total" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "reservationSlots" (
    "id" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "slotId" TEXT NOT NULL,
    "registerAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sitAt" TIMESTAMP(3),
    "leaveAt" TIMESTAMP(3),
    "cancelAt" TIMESTAMP(3),

    CONSTRAINT "reservationSlots_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reservationSlots" ADD CONSTRAINT "reservationSlots_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "RestTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservationSlots" ADD CONSTRAINT "reservationSlots_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "Slots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
