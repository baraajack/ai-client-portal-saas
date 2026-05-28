import { Client } from "@prisma/client";
import { DeleteClientButton } from "@/features/clients/components/delete-client-button";
import { EditClientDialog } from "@/features/clients/components/edit-client-dialog";

type ClientsTableProps = {
  clients: Client[];
};

export function ClientsTable({ clients }: ClientsTableProps) {
  if (clients.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        No clients found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Name</th>
            <th className="px-4 py-3 text-left font-medium">Company</th>
            <th className="px-4 py-3 text-left font-medium">Email</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="border-t">
              <td className="px-4 py-3 font-medium">{client.name}</td>
              <td className="px-4 py-3">{client.company ?? "-"}</td>
              <td className="px-4 py-3">{client.email ?? "-"}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <EditClientDialog client={client} />
                  <DeleteClientButton clientId={client.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}