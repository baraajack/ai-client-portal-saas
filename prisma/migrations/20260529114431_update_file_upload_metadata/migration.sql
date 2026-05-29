/*
  Warnings:

  - A unique constraint covering the columns `[id,projectId]` on the table `FileUpload` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FileUpload_id_projectId_key" ON "FileUpload"("id", "projectId");
