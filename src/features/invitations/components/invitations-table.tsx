import { Invitation, User } from "@prisma/client";
import { format } from "date-fns";
import { RevokeInvitationButton } from "@/features/invitations/components/revoke-invitation-button";
import { Badge } from "@/components/ui/badge";
import { MailOpen } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
      <EmptyState compact icon={MailOpen} title="No pending invitations" description="New workspace invitations will appear here until accepted or revoked." />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <Table>
        <TableHeader className="bg-muted/55">
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead>Invited by</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitations.map((invite) => (
            <TableRow key={invite.id}>
              <TableCell className="font-medium">{invite.email}</TableCell>
              <TableCell>{invite.role.replaceAll("_", " ")}</TableCell>
              <TableCell>
                <Badge variant="secondary">{invite.status}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{format(invite.expiresAt, "MMM d, yyyy")}</TableCell>
              <TableCell className="text-muted-foreground">
                {invite.invitedBy?.email ?? "System"}
              </TableCell>
              <TableCell className="text-right">
                {invite.status === "PENDING" && (
                  <RevokeInvitationButton invitationId={invite.id} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
