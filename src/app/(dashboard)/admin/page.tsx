import { getInvitations } from "@/features/invitations/queries";
import { InvitationsTable } from "@/features/invitations/components/invitations-table";
import { getWorkspaceMembers } from "@/features/admin/queries";
import { getWorkspaceSettings } from "@/features/admin/queries";
import { MembersTable } from "@/features/admin/components/members-table";
import { WorkspaceSettingsCard } from "@/features/admin/components/workspace-settings-card";
import { InviteMemberCard } from "@/features/admin/components/invite-member-card";

export default async function AdminPage() {
  const [members, workspace, invitations] = await Promise.all([
    getWorkspaceMembers(),
    getWorkspaceSettings(),
    getInvitations(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Admin Panel
        </h1>

        <p className="text-muted-foreground">
          Manage workspace members and
          settings.
        </p>
      </div>

      <WorkspaceSettingsCard
        name={workspace.name}
      />

      <InviteMemberCard />
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Pending Invitations</h2>
          <InvitationsTable invitations={invitations} />
        </section>


      <MembersTable members={members} />
    </div>
  );
}