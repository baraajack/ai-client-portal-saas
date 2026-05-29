import { getCurrentWorkspace } from "@/lib/auth/current-workspace";
import { getRecentAuditLogs } from "@/features/audit-logs/queries";
import { RecentActivity } from "@/features/audit-logs/components/recent-activity";

export default async function DashboardPage() {
  const { workspace, role } = await getCurrentWorkspace();
  const logs = await getRecentAuditLogs(5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <p className="text-muted-foreground">
          Workspace: {workspace.name}
        </p>

        <p className="text-muted-foreground">
          Role: {role}
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Recent activity</h2>
        <RecentActivity logs={logs} />
      </section>
    </div>
  );
}