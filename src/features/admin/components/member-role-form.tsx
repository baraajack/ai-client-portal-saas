"use client";

import { Role } from "@prisma/client";
import { updateMemberRoleAction } from "@/features/admin/actions";

type Props = {
  memberId: string;
  currentRole: Role;
};

export function MemberRoleForm({
  memberId,
  currentRole,
}: Props) {
  const action = updateMemberRoleAction.bind(
    null,
    memberId
  ) as unknown as (formData: FormData) => void;
  return (
    <form action={action}>
      <select
        name="role"
        defaultValue={currentRole}
        className="border rounded px-2 py-1"
      >
        {Object.values(Role).map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="ml-2 text-sm"
      >
        Save
      </button>
    </form>
  );
}