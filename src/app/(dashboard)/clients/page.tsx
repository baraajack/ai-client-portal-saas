import { getClients } from "@/features/clients/queries";
import { ClientsTable } from "@/features/clients/components/clients-table";
import { CreateClientDialog } from "@/features/clients/components/create-client-dialog";

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Clients</h1>
          <p className="text-muted-foreground">
            Manage client records and relationships.
          </p>
        </div>

        <CreateClientDialog />
      </div>

      <ClientsTable clients={clients} />
    </div>
  );
}