"use client";

import { Client } from "@prisma/client";
import { Pencil } from "lucide-react";
import { updateClientAction } from "@/features/clients/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type EditClientDialogProps = {
  client: Client;
};

export function EditClientDialog({ client }: EditClientDialogProps) {
  const updateClientWithId = updateClientAction.bind(null, client.id);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="mr-2 size-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit client</DialogTitle>
          <DialogDescription>Update client details and internal workspace context.</DialogDescription>
        </DialogHeader>

        <form
          action={async (formData) => {
            await updateClientWithId(formData);
            }}
            className="space-y-4"
>
          <div className="space-y-2"><Label htmlFor={`client-name-${client.id}`}>Client name</Label><Input id={`client-name-${client.id}`} name="name" defaultValue={client.name} required /></div>
          <div className="space-y-2"><Label htmlFor={`client-email-${client.id}`}>Email</Label><Input id={`client-email-${client.id}`} name="email" type="email" defaultValue={client.email ?? ""} /></div>
          <div className="space-y-2"><Label htmlFor={`client-company-${client.id}`}>Company</Label><Input id={`client-company-${client.id}`} name="company" defaultValue={client.company ?? ""} /></div>
          <div className="space-y-2"><Label htmlFor={`client-notes-${client.id}`}>Notes</Label><Textarea id={`client-notes-${client.id}`} name="notes" defaultValue={client.notes ?? ""} /></div>

          <Button type="submit" className="w-full">
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
