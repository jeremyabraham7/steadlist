/*
  Warnings:

  - You are about to drop the column `userKey` on the `Vote` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "userKey",
ADD COLUMN     "userId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
