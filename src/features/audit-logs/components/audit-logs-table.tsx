import { AuditLog, User } from "@prisma/client";
import { format } from "date-fns";
import { AuditActionBadge } from "@/features/audit-logs/components/audit-action-badge";
import { ScrollText } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type AuditLogWithActor = AuditLog & {
  actor: User | null;
};

type AuditLogsTableProps = {
  logs: AuditLogWithActor[];
};

export function AuditLogsTable({ logs }: AuditLogsTableProps) {
  if (logs.length === 0) {
    return (
      <EmptyState icon={ScrollText} title="No audit events" description="Workspace and administrative changes will appear here as they occur." />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <Table>
        <TableHeader className="bg-muted/55">
          <TableRow>
            <TableHead>Action</TableHead>
            <TableHead>Entity</TableHead>
            <TableHead>Actor</TableHead>
            <TableHead>Entity ID</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>
                <AuditActionBadge action={log.action} />
              </TableCell>
              <TableCell>{log.entity}</TableCell>
              <TableCell>
                {log.actor?.fullName || log.actor?.email || "System"}
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {log.entityId}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {format(log.createdAt, "PPpp")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
