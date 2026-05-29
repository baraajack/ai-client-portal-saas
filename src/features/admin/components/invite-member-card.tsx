import { CreateInvitationForm } from "@/features/invitations/components/create-invitation-form";

export function InviteMemberCard() {
  return (
    <div className="rounded-lg border p-6">
      <h2 className="font-semibold">Invite Members</h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Invite new users to this workspace.
      </p>

      <div className="mt-4">
        <CreateInvitationForm />
      </div>
    </div>
  );
}