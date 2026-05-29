import { Invitation, User } from "@prisma/client";
import { format } from "date-fns";
import { RevokeInvitationButton } from "@/features/invitations/components/revoke-invitation-button";
import { Badge } from "@/components/ui/badge";

type InvitationWithUser = Invitation & {
  invitedBy: User | null;
};

export function InvitationsTable({
  invitations,
}: {
  invitations: InvitationWithUser[];
}) {
  if (invitations.length === 0) {
    return (
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        No invitations found.
      </div>
    );
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Expires</th>
            <th className="px-4 py-3 text-left">Invited By</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {invitations.map((invite) => (
            <tr key={invite.id} className="border-t">
              <td className="px-4 py-3">{invite.email}</td>
              <td className="px-4 py-3">{invite.role}</td>
              <td className="px-4 py-3">
                <Badge variant="secondary">{invite.status}</Badge>
              </td>
              <td className="px-4 py-3">{format(invite.expiresAt, "PPP")}</td>
              <td className="px-4 py-3">
                {invite.invitedBy?.email ?? "System"}
              </td>
              <td className="px-4 py-3 text-right">
                {invite.status === "PENDING" && (
                  <RevokeInvitationButton invitationId={invite.id} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}