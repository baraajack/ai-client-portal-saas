import { getAuditLogs } from "@/features/audit-logs/queries";
import { AuditLogsTable } from "@/features/audit-logs/components/audit-logs-table";
import { PageHeader } from "@/components/ui/page-header";

export default async function AuditLogsPage() {
  const logs = await getAuditLogs();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Management"
        title="Audit logs"
        description="Review workspace activity, administrative changes, and security-relevant events."
      />

      <AuditLogsTable logs={logs} />
    </div>
  );
}
