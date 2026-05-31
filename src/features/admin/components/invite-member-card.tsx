import { CreateInvitationForm } from "@/features/invitations/components/create-invitation-form";
import { UserPlus } from "lucide-react";

export function InviteMemberCard() {
  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><UserPlus className="size-4" /></div>
        <div>
          <h2 className="text-sm font-semibold">Invite members</h2>
          <p className="mt-1 text-xs text-muted-foreground">Add users to this workspace.</p>
        </div>
      </div>

      <div className="mt-4">
        <CreateInvitationForm />
      </div>
    </div>
  );
}
