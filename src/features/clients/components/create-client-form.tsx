"use client";

import { createClientAction } from "@/features/clients/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function CreateClientForm() {
  return (
    <form
    action={async (formData) => {
        await createClientAction(formData);
    }}
    className="space-y-4"
    >
      <div className="space-y-2"><Label htmlFor="client-name">Client name</Label><Input id="client-name" name="name" placeholder="Acme Corporation" required /></div>
      <div className="space-y-2"><Label htmlFor="client-email">Email</Label><Input id="client-email" name="email" type="email" placeholder="client@example.com" /></div>
      <div className="space-y-2"><Label htmlFor="client-company">Company</Label><Input id="client-company" name="company" placeholder="Organization name" /></div>
      <div className="space-y-2"><Label htmlFor="client-notes">Notes</Label><Textarea id="client-notes" name="notes" placeholder="Add internal context for your team." /></div>

      <Button type="submit" className="w-full">
        Create client
      </Button>
    </form>
  );
}
