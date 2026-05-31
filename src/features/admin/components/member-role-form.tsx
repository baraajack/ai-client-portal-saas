"use client";

import { Role } from "@prisma/client";
import { updateMemberRoleAction } from "@/features/admin/actions";
import { Button } from "@/components/ui/button";

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
        className="h-8 rounded-lg border border-input bg-background px-2 text-xs shadow-xs"
      >
        {Object.values(Role).map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>

      <Button type="submit" variant="outline" size="sm" className="ml-2">
        Save
      </Button>
    </form>
  );
}
