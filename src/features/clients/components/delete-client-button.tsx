"use client";

import { Trash2 } from "lucide-react";
import { deleteClientAction } from "@/features/clients/actions";
import { Button } from "@/components/ui/button";

type DeleteClientButtonProps = {
  clientId: string;
};

export function DeleteClientButton({ clientId }: DeleteClientButtonProps) {
  return (
    <form
      action={async () => {
        await deleteClientAction(clientId);
      }}
    >      
    <Button type="submit" variant="destructive" size="icon-sm" aria-label="Delete client" title="Delete client">
        <Trash2 className="size-4" />
      </Button>
    </form>
  );
}
