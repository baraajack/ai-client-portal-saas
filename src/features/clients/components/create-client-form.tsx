"use client";

import { createClientAction } from "@/features/clients/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CreateClientForm() {
  return (
    <form
    action={async (formData) => {
        await createClientAction(formData);
    }}
    className="space-y-4"
    >
      <Input name="name" placeholder="Client name" required />
      <Input name="email" type="email" placeholder="Email" />
      <Input name="company" placeholder="Company" />
      <Textarea name="notes" placeholder="Notes" />

      <Button type="submit" className="w-full">
        Create client
      </Button>
    </form>
  );
}