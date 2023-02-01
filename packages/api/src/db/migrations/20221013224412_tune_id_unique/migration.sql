/*
  Warnings:

  - A unique constraint covering the columns `[tuneId]` on the table `GPT3Model` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GPT3Model_tuneId_key" ON "GPT3Model"("tuneId");
