import { uploadProjectFileAction } from "@/features/files/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

type UploadFileFormProps = {
  projectId: string;
};

export function UploadFileForm({ projectId }: UploadFileFormProps) {
  const uploadWithProject = uploadProjectFileAction.bind(
  null,
  projectId
) as unknown as (formData: FormData) => void;
  return (
    <form action={uploadWithProject} className="rounded-lg border border-dashed bg-muted/20 p-3">
      <p className="mb-2 text-xs font-medium text-muted-foreground">
        Upload a project file
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input name="file" type="file" required className="bg-background" />
        <Button type="submit"><Upload className="size-4" /> Upload</Button>
      </div>
    </form>
  );
}
