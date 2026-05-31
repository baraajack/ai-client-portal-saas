import { getCurrentWorkspace } from "@/lib/auth/current-workspace";
import { getRecentAuditLogs } from "@/features/audit-logs/queries";
import { RecentActivity } from "@/features/audit-logs/components/recent-activity";
import { Activity, Building2, ShieldCheck, UserRoundCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export default async function DashboardPage() {
  const { workspace, role } = await getCurrentWorkspace();
  const canViewActivity = role === "ADMIN" || role === "MANAGER";
  const logs = canViewActivity ? await getRecentAuditLogs(5) : [];
  const roleLabel = role.replaceAll("_", " ");
  const stats = [
    {
      label: "Workspace",
      value: workspace.name,
      description: "Active tenant context",
      icon: Building2,
    },
    {
      label: "Access level",
      value: roleLabel,
      description: "Role-based permissions",
      icon: UserRoundCheck,
    },
    {
      label: "Recent events",
      value: canViewActivity ? String(logs.length) : "Private",
      description: canViewActivity ? "Latest workspace activity" : "Activity is role protected",
      icon: Activity,
    },
    {
      label: "Security",
      value: "Protected",
      description: "Workspace isolation active",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Workspace"
        title="Dashboard"
        description="Monitor your workspace, delivery activity, and current access context."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, description, icon: Icon }) => (
          <Card key={label}>
            <CardContent className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground">{label}</p>
                <p className="mt-2 truncate text-xl font-semibold tracking-tight">{value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{description}</p>
              </div>
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {canViewActivity && (
        <section className="rounded-lg border bg-card shadow-sm">
          <div className="border-b px-5 py-4">
            <h2 className="text-sm font-semibold">Recent activity</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              The latest workspace changes and security-relevant events.
            </p>
          </div>
          <div className="p-5">
            <RecentActivity logs={logs} />
          </div>
        </section>
      )}
    </div>
  );
}
