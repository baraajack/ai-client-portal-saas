import { getAuditLogs } from "@/features/audit-logs/queries";
import { AuditLogsTable } from "@/features/audit-logs/components/audit-logs-table";

export default async function AuditLogsPage() {
  const logs = await getAuditLogs();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Audit Logs</h1>
        <p className="text-muted-foreground">
          Review recent workspace activity and security-relevant events.
        </p>
      </div>

      <AuditLogsTable logs={logs} />
    </div>
  );
}