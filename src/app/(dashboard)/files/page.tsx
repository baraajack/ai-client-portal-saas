import { requirePermission } from "@/lib/permissions/require-permission";

export default async function FilesPage() {
  await requirePermission("files", "view");

  return (
    <div>
      <h1 className="text-2xl font-bold">Files</h1>
      <p className="text-muted-foreground">
        Files are organized under their related project pages.
      </p>
    </div>
  );
}