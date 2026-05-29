"use client";

import { Role } from "@prisma/client";
import { createInvitationAction } from "@/features/invitations/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CreateInvitationForm() {
  return (
    <form
      action={createInvitationAction as unknown as (formData: FormData) => void}
      className="flex gap-2"
    >
      <Input name="email" type="email" placeholder="Email" required />

      <select name="role" defaultValue="CLIENT" className="rounded-md border px-3">
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