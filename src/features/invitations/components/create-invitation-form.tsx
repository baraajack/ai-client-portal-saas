"use client";

import { Role } from "@prisma/client";
import { createInvitationAction } from "@/features/invitations/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CreateInvitationForm() {
  return (
    <form
      action={createInvitationAction as unknown as (formData: FormData) => void}
      className="flex flex-col gap-2 sm:flex-row"
    >
      <Input name="email" type="email" placeholder="Email" required />

      <select name="role" defaultValue="CLIENT" className="h-9 rounded-lg border border-input bg-background px-3 text-sm shadow-xs">
        {Object.values(Role).map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>

      <Button type="submit">Invite</Button>
    </form>
  );
}
