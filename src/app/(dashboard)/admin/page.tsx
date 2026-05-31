import { getInvitations } from "@/features/invitations/queries";
import { InvitationsTable } from "@/features/invitations/components/invitations-table";
import { getWorkspaceMembers } from "@/features/admin/queries";
import { getWorkspaceSettings } from "@/features/admin/queries";
import { MembersTable } from "@/features/admin/components/members-table";
import { WorkspaceSettingsCard } from "@/features/admin/components/workspace-settings-card";
import { InviteMemberCard } from "@/features/admin/components/invite-member-card";
import { PageHeader } from "@/components/ui/page-header";

export default async function AdminPage() {
  const [members, workspace, invitations] = await Promise.all([
    getWorkspaceMembers(),
    getWorkspaceSettings(),
    getInvitations(),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Management"
        title="Workspace administration"
        description="Manage workspace identity, invitations, and member access."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <WorkspaceSettingsCard name={workspace.name} />
        <InviteMemberCard />
      </div>

        <section className="space-y-3">
          <div>
            <h2 className="text-sm font-semibold">Pending invitations</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Review outstanding workspace invitations and access levels.
            </p>
          </div>
          <InvitationsTable invitations={invitations} />
        </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-semibold">Workspace members</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Maintain member roles and workspace access.
          </p>
        </div>
        <MembersTable members={members} />
      </section>
    </div>
  );
}
