import { AuditLog, User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { AuditActionBadge } from "@/features/audit-logs/components/audit-action-badge";

type AuditLogWithActor = AuditLog & {
  actor: User | null;
};

export function RecentActivity({ logs }: { logs: AuditLogWithActor[] }) {
  if (logs.length === 0) {
    return (
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        No recent activity.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {logs.map((log) => (
        <div
          key={log.id}
          className="flex items-center justify-between gap-4 rounded-lg border p-4"
        >
          <div>
            <AuditActionBadge action={log.action} />
            <p className="mt-2 text-sm text-muted-foreground">
              {log.actor?.fullName || log.actor?.email || "System"} ·{" "}
              {log.entity}
            </p>
          </div>

          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(log.createdAt, { addSuffix: true })}
          </p>
        </div>
      ))}
    </div>
  );
}