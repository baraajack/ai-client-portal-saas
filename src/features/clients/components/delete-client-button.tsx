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
    <Button type="submit" variant="destructive" size="sm">
        <Trash2 className="mr-2 size-4" />
        Delete
      </Button>
    </form>
  );
}