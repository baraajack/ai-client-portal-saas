"use client";

import { Client } from "@prisma/client";
import { Pencil } from "lucide-react";
import { updateClientAction } from "@/features/clients/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
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
        </DialogHeader>

        <form
          action={async (formData) => {
            await updateClientWithId(formData);
            }}
            className="space-y-4"
>
          <Input name="name" defaultValue={client.name} required />
          <Input name="email" type="email" defaultValue={client.email ?? ""} />
          <Input name="company" defaultValue={client.company ?? ""} />
          <Textarea name="notes" defaultValue={client.notes ?? ""} />

          <Button type="submit" className="w-full">
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}