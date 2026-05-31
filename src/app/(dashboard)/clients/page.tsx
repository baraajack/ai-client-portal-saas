import { getClients } from "@/features/clients/queries";
import { ClientsTable } from "@/features/clients/components/clients-table";
import { CreateClientDialog } from "@/features/clients/components/create-client-dialog";
import { PageHeader } from "@/components/ui/page-header";

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Workspace"
        title="Clients"
        description="Manage client records, organizations, and delivery relationships."
        actions={<CreateClientDialog />}
      />

      <ClientsTable clients={clients} />
    </div>
  );
}
