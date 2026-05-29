"use client";

import { revokeInvitationAction } from "@/features/invitations/actions";
import { Button } from "@/components/ui/button";

export function RevokeInvitationButton({
  invitationId,
}: {
  invitationId: string;
}) {
  return (
    <form action={() => revokeInvitationAction(invitationId)}>
      <Button type="submit" variant="destructive" size="sm">
        Revoke
      </Button>
    </form>
  );
}