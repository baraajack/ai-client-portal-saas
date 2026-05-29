import { WorkspaceMember, User } from "@prisma/client";
import { RoleBadge } from "./role-badge";
import { MemberRoleForm } from "./member-role-form";

type Member = WorkspaceMember & {
  user: User;
};

export function MembersTable({
  members,
}: {
  members: Member[];
}) {
  return (
    <div className="rounded-lg border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left">
              User
            </th>
            <th className="px-4 py-3 text-left">
              Email
            </th>
            <th className="px-4 py-3 text-left">
              Role
            </th>
            <th className="px-4 py-3 text-left">
              Change Role
            </th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <tr
              key={member.id}
              className="border-t"
            >
              <td className="px-4 py-3">
                {member.user.fullName ??
                  "No Name"}
              </td>

              <td className="px-4 py-3">
                {member.user.email}
              </td>

              <td className="px-4 py-3">
                <RoleBadge role={member.role} />
              </td>

              <td className="px-4 py-3">
                <MemberRoleForm
                  memberId={member.id}
                  currentRole={member.role}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}