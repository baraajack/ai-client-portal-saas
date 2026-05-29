"use client";

import { revokeInvitationAction } from "@/features/invitations/actions";
import { Button } from "@/components/ui/button";

export function RevokeInvitationButton({
  invitationId,
}: {
  invitationId: string;
}) {
  const revokeAction = revokeInvitationAction.bind(
    null,
    invitationId
  ) as unknown as (formData: FormData) => void;

  return (
    <form action={revokeAction}>
      <Button type="submit" variant="destructive" size="sm">
        Revoke
      </Button>
    </form>
  );
}