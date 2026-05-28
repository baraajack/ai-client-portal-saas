/*
  Warnings:

  - A unique constraint covering the columns `[id,workspaceId]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Client_id_workspaceId_key" ON "Client"("id", "workspaceId");
