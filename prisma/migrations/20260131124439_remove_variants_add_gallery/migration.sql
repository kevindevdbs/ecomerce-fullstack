/*
  Warnings:

  - You are about to drop the `ProductVariant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_productId_fkey";

-- DropForeignKey
ALTER TABLE "WholesaleOption" DROP CONSTRAINT "WholesaleOption_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "additionalImages" TEXT[];

-- DropTable
DROP TABLE "ProductVariant";

-- AddForeignKey
ALTER TABLE "WholesaleOption" ADD CONSTRAINT "WholesaleOption_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
