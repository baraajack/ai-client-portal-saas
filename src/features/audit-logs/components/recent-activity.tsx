import { AuditLog, User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { AuditActionBadge } from "@/features/audit-logs/components/audit-action-badge";
import { Activity } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

type AuditLogWithActor = AuditLog & {
  actor: User | null;
};

export function RecentActivity({ logs }: { logs: AuditLogWithActor[] }) {
  if (logs.length === 0) {
    return (
      <EmptyState
        compact
        icon={Activity}
        title="No recent activity"
        description="Workspace changes and administrative events will appear here."
      />
    );
  }

  return (
    <div className="relative space-y-0 before:absolute before:bottom-3 before:left-4 before:top-3 before:w-px before:bg-border">
      {logs.map((log) => (
        <div
          key={log.id}
          className="relative flex items-start justify-between gap-4 py-3 pl-10"
        >
          <div className="absolute left-1 top-3.5 flex size-6 items-center justify-center rounded-full border bg-background text-primary shadow-sm">
            <Activity className="size-3" />
          </div>
          <div className="min-w-0">
            <AuditActionBadge action={log.action} />
            <p className="mt-1.5 text-sm text-muted-foreground">
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
