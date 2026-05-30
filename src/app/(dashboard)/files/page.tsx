import { ClientProfileNotLinked } from "@/features/clients/components/client-profile-not-linked";
import { getOptionalCurrentClient } from "@/lib/auth/current-client";
import { requirePermission } from "@/lib/permissions/require-permission";

export default async function FilesPage() {
  const { role } = await requirePermission("files", "view");
  const client = await getOptionalCurrentClient();

  if (role === "CLIENT" && !client) {
    return <ClientProfileNotLinked />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Files</h1>
      <p className="text-muted-foreground">
        Files are organized under their related project pages.
      </p>
    </div>
  );
}
