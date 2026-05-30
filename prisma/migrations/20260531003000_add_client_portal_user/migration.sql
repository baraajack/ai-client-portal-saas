-- AlterTable
ALTER TABLE "Client" ADD COLUMN "portalUserId" TEXT;

-- Backfill only unambiguous workspace-local email matches for existing client users.
UPDATE "Client" AS client
SET "portalUserId" = member."userId"
FROM (
    SELECT
        workspace_member."workspaceId",
        workspace_member."userId",
        LOWER("User"."email") AS "normalizedEmail"
    FROM "WorkspaceMember" AS workspace_member
    INNER JOIN "User" ON "User"."id" = workspace_member."userId"
    WHERE workspace_member."role" = 'CLIENT'
) AS member
WHERE client."workspaceId" = member."workspaceId"
  AND client."email" IS NOT NULL
  AND LOWER(client."email") = member."normalizedEmail"
  AND (
      SELECT COUNT(*)
      FROM "Client" AS matching_client
      WHERE matching_client."workspaceId" = client."workspaceId"
        AND matching_client."email" IS NOT NULL
        AND LOWER(matching_client."email") = LOWER(client."email")
  ) = 1;

-- CreateIndex
CREATE INDEX "Client_portalUserId_idx" ON "Client"("portalUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Client_workspaceId_portalUserId_key" ON "Client"("workspaceId", "portalUserId");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_portalUserId_fkey" FOREIGN KEY ("portalUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
