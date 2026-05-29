import { redirect } from "next/navigation";
import { getSignedFileUrl } from "@/features/files/queries";

type FilePageProps = {
  params: Promise<{
    fileId: string;
  }>;
};

export default async function FilePage({ params }: FilePageProps) {
  const { fileId } = await params;
  const signedUrl = await getSignedFileUrl(fileId);

  redirect(signedUrl);
}