-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "isVisible" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isVisible" BOOLEAN NOT NULL DEFAULT true;
