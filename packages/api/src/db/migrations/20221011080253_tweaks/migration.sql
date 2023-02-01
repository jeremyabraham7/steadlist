/*
  Warnings:

  - You are about to drop the column `user_input` on the `Idea` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Idea" DROP COLUMN "user_input",
ADD COLUMN     "userInput" TEXT,
ALTER COLUMN "subcategory" DROP DEFAULT;
