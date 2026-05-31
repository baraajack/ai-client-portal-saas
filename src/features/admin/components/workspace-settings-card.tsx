import { updateWorkspaceNameAction } from "@/features/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2 } from "lucide-react";

export function WorkspaceSettingsCard({
  name,
}: {
  name: string;
}) {
  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Building2 className="size-4" /></div>
        <div>
          <h2 className="text-sm font-semibold">Workspace settings</h2>
          <p className="mt-1 text-xs text-muted-foreground">Update your workspace identity.</p>
        </div>
      </div>

      <form
        action={updateWorkspaceNameAction as unknown as (formData: FormData) => void}
        className="mt-5 flex gap-2"
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
