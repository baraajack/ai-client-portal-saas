import { WorkspaceMember, User } from "@prisma/client";
import { RoleBadge } from "./role-badge";
import { MemberRoleForm } from "./member-role-form";
import { Users } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Member = WorkspaceMember & {
  user: User;
};

export function MembersTable({
  members,
}: {
  members: Member[];
}) {
  if (members.length === 0) {
    return <EmptyState compact icon={Users} title="No members found" description="Workspace members will appear here after they join." />;
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <Table>
        <TableHeader className="bg-muted/55">
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Change role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">
                {member.user.fullName ??
                  "No Name"}
              </TableCell>

              <TableCell className="text-muted-foreground">
                {member.user.email}
              </TableCell>

              <TableCell>
                <RoleBadge role={member.role} />
              </TableCell>

              <TableCell>
                <MemberRoleForm
                  memberId={member.id}
                  currentRole={member.role}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
