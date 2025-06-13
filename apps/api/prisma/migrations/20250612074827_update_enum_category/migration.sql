/*
  Warnings:

  - The values [Villa,Apartment,Homestay] on the enum `PropertyCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PropertyCategory_new" AS ENUM ('VILLA', 'APARTMENT', 'HOMESTAY');
ALTER TABLE "Property" ALTER COLUMN "category" TYPE "PropertyCategory_new" USING ("category"::text::"PropertyCategory_new");
ALTER TYPE "PropertyCategory" RENAME TO "PropertyCategory_old";
ALTER TYPE "PropertyCategory_new" RENAME TO "PropertyCategory";
DROP TYPE "PropertyCategory_old";
COMMIT;
