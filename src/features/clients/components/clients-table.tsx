import { Client } from "@prisma/client";
import { DeleteClientButton } from "@/features/clients/components/delete-client-button";
import { EditClientDialog } from "@/features/clients/components/edit-client-dialog";
import { Building2, Users } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type ClientsTableProps = {
  clients: Client[];
};

export function ClientsTable({ clients }: ClientsTableProps) {
  if (clients.length === 0) {
    return (
      <EmptyState icon={Users} title="No clients yet" description="Create a client record to start organizing projects and delivery relationships." />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <Table>
        <TableHeader className="bg-muted/55">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary"><Building2 className="size-4" /></div>
                  <span className="font-medium">{client.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{client.company ?? "—"}</TableCell>
              <TableCell className="text-muted-foreground">{client.email ?? "—"}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <EditClientDialog client={client} />
                  <DeleteClientButton clientId={client.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
