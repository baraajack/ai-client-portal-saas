import { ClientProfileNotLinked } from "@/features/clients/components/client-profile-not-linked";
import { getOptionalCurrentClient } from "@/lib/auth/current-client";
import { requirePermission } from "@/lib/permissions/require-permission";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { FolderOpen } from "lucide-react";

export default async function FilesPage() {
  const { role } = await requirePermission("files", "view");
  const client = await getOptionalCurrentClient();

  if (role === "CLIENT" && !client) {
    return <ClientProfileNotLinked />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Delivery"
        title="Files"
        description="Access project documents and shared deliverables from their related project workspace."
      />
      <EmptyState
        icon={FolderOpen}
        title="Files are organized by project"
        description="Open a project to upload, review, or download its documents and deliverables."
      />
    </div>
  );
}
