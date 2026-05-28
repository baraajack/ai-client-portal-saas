import { requirePermission } from "@/lib/permissions/require-permission";

export default async function AdminPage() {
  await requirePermission("admin", "view");

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin</h1>
      <p className="text-muted-foreground">
        Manage workspace settings, users, and permissions.
      </p>
    </div>
  );
}