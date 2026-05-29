import { updateWorkspaceNameAction } from "@/features/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function WorkspaceSettingsCard({
  name,
}: {
  name: string;
}) {
  return (
    <div className="rounded-lg border p-6">
      <h2 className="font-semibold">
        Workspace Settings
      </h2>

      <form
        action={updateWorkspaceNameAction as unknown as (formData: FormData) => void}
        className="mt-4 flex gap-2"
      >
        <Input
          name="name"
          defaultValue={name}
        />

        <Button type="submit">
          Save
        </Button>
      </form>
    </div>
  );
}