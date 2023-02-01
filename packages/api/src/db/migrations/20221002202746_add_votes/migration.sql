/*
  Warnings:

  - You are about to drop the column `downvotes` on the `Idea` table. All the data in the column will be lost.
  - You are about to drop the column `upvotes` on the `Idea` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('UP', 'DOWN');

-- AlterTable
ALTER TABLE "Idea" DROP COLUMN "downvotes",
DROP COLUMN "upvotes";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar",
DROP COLUMN "bio",
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Vote" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ideaId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "type" "VoteType" NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "Idea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
