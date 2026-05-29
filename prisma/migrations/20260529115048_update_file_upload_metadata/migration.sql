/*
  Warnings:

  - Added the required column `filePath` to the `FileUpload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FileUpload" ADD COLUMN     "filePath" TEXT NOT NULL,
ADD COLUMN     "uploadedById" TEXT,
ALTER COLUMN "fileUrl" DROP NOT NULL;
