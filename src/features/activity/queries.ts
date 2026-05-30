import { prisma } from "@/lib/db/prisma";
import { requirePermission } from "@/lib/permissions/require-permission";
import { formatDistanceToNow } from "date-fns";

function formatActivity(action: string, entity: string) {
  switch (action) {
    case "PROJECT_CREATED":
      return "created a project";
    case "PROJECT_UPDATED":
      return "updated a project";
    case "PROJECT_DELETED":
      return "deleted a project";

    case "TASK_CREATED":
      return "created a task";
    case "TASK_UPDATED":
      return "updated a task";
    case "TASK_DELETED":
      return "deleted a task";

    case "CLIENT_CREATED":
      return "created a client";
    case "CLIENT_UPDATED":
      return "updated a client";
    case "CLIENT_DELETED":
      return "deleted a client";

    case "INVITATION_CREATED":
      return "created an invitation";
    case "INVITATION_ACCEPTED":
      return "accepted an invitation";

    default:
      return `${action.toLowerCase().replaceAll("_", " ")} ${entity}`;
  }
}

export async function getActivityFeed() {
  const { workspace } = await requirePermission("auditLogs", "view");

  const logs = await prisma.auditLog.findMany({
    where: {
      workspaceId: workspace.id,
    },
    include: {
      actor: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
  });

  return logs.map((log) => ({
    id: log.id,
    actor:
      log.actor?.fullName ??
      log.actor?.email ??
      "System",
    text: formatActivity(log.action, log.entity),
    time: formatDistanceToNow(log.createdAt, {
      addSuffix: true,
    }),
  }));
}