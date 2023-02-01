/*
  Warnings:

  - You are about to drop the column `userId` on the `Vote` table. All the data in the column will be lost.
  - Added the required column `userKey` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_userId_fkey";

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "userId",
ADD COLUMN     "userKey" TEXT NOT NULL;
