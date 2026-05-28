import { getCurrentWorkspace } from "@/lib/auth/current-workspace";

export default async function DashboardPage() {
  const { workspace, role } = await getCurrentWorkspace();

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <p className="text-muted-foreground">
        Workspace: {workspace.name}
      </p>

      <p className="text-muted-foreground">
        Role: {role}
      </p>
    </div>
  );
}