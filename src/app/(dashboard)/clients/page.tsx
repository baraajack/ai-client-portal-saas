import { requirePermission } from "@/lib/permissions/require-permission";

export default async function ClientsPage() {
  await requirePermission("clients", "view");

  return (
    <div>
      <h1 className="text-2xl font-bold">Clients</h1>
      <p className="text-muted-foreground">
        Manage client records and relationships.
      </p>
    </div>
  );
}