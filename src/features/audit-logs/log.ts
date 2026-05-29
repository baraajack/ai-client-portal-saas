import { prisma } from "@/lib/db/prisma";

type CreateAuditLogInput = {
  workspaceId: string;
  action: string;
  entity: string;
  entityId: string;
  actorId?: string | null;
  metadata?: Record<string, unknown>;
};

export async function createAuditLog(input: CreateAuditLogInput) {
  return prisma.auditLog.create({
    data: {
      workspaceId: input.workspaceId,
      action: input.action,
      entity: input.entity,
      entityId: input.entityId,
      actorId: input.actorId ?? null,
      metadata: input.metadata ?? undefined,
    },
  });
}