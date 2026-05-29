import { AuditLog, User } from "@prisma/client";
import { format } from "date-fns";
import { AuditActionBadge } from "@/features/audit-logs/components/audit-action-badge";

type AuditLogWithActor = AuditLog & {
  actor: User | null;
};

type AuditLogsTableProps = {
  logs: AuditLogWithActor[];
};

export function AuditLogsTable({ logs }: AuditLogsTableProps) {
  if (logs.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        No audit logs found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Action</th>
            <th className="px-4 py-3 text-left font-medium">Entity</th>
            <th className="px-4 py-3 text-left font-medium">Actor</th>
            <th className="px-4 py-3 text-left font-medium">Entity ID</th>
            <th className="px-4 py-3 text-left font-medium">Time</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-t">
              <td className="px-4 py-3">
                <AuditActionBadge action={log.action} />
              </td>
              <td className="px-4 py-3">{log.entity}</td>
              <td className="px-4 py-3">
                {log.actor?.fullName || log.actor?.email || "System"}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                {log.entityId}
              </td>
              <td className="px-4 py-3">
                {format(log.createdAt, "PPpp")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}