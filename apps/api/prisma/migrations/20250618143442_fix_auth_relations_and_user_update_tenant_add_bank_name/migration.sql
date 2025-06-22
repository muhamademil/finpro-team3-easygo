/*
  Warnings:

  - You are about to drop the column `email` on the `registration_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `registration_tokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `registration_tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `registration_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bank_account_name` to the `tenants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registration_tokens" DROP COLUMN "email",
DROP COLUMN "role",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tenants" ADD COLUMN     "bank_account_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "registration_tokens_user_id_key" ON "registration_tokens"("user_id");

-- AddForeignKey
ALTER TABLE "registration_tokens" ADD CONSTRAINT "registration_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
