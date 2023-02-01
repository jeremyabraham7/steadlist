/*
  Warnings:

  - You are about to drop the column `industry` on the `Idea` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ideaId,userId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `Idea` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Idea" RENAME COLUMN "industry" to "category";
ALTER TABLE "Idea" ADD COLUMN     "subcategory" TEXT NOT NULL DEFAULT 'subtest',
ADD COLUMN     "userId" UUID,
ADD COLUMN     "user_input" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Vote_ideaId_userId_key" ON "Vote"("ideaId", "userId");

-- AddForeignKey
ALTER TABLE "Idea" ADD CONSTRAINT "Idea_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
