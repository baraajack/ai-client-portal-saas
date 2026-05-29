import { uploadProjectFileAction } from "@/features/files/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type UploadFileFormProps = {
  projectId: string;
};

export function UploadFileForm({ projectId }: UploadFileFormProps) {
  const uploadWithProject = uploadProjectFileAction.bind(
  null,
  projectId
) as unknown as (formData: FormData) => void;
  return (
    <form action={uploadWithProject} className="flex gap-2">
      <Input name="file" type="file" required />
      <Button type="submit">Upload</Button>
    </form>
  );
}