import { getWorkspaceMembers } from "@/features/admin/queries";
import { getWorkspaceSettings } from "@/features/admin/queries";
import { MembersTable } from "@/features/admin/components/members-table";
import { WorkspaceSettingsCard } from "@/features/admin/components/workspace-settings-card";
import { InviteMemberCard } from "@/features/admin/components/invite-member-card";

export default async function AdminPage() {
  const [members, workspace] =
    await Promise.all([
      getWorkspaceMembers(),
      getWorkspaceSettings(),
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

      <MembersTable members={members} />
    </div>
  );
}