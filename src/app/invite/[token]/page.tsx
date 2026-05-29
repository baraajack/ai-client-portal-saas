import { getInvitationByToken } from "@/features/invitations/queries";
import { acceptInvitationAction } from "@/features/invitations/actions";
import { Button } from "@/components/ui/button";

type InvitePageProps = {
  params: Promise<{
    token: string;
  }>;
};

export default async function InvitePage({ params }: InvitePageProps) {
  const { token } = await params;
  const invitation = await getInvitationByToken(token);

  if (!invitation) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <div className="max-w-md rounded-lg border p-6 text-center">
          <h1 className="text-xl font-bold">Invalid invitation</h1>
          <p className="mt-2 text-muted-foreground">
            This invitation does not exist.
          </p>
        </div>
      </main>
    );
  }

  const acceptWithToken = acceptInvitationAction.bind(null, token);

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-md rounded-lg border p-6">
        <h1 className="text-xl font-bold">Workspace Invitation</h1>

        <p className="mt-2 text-muted-foreground">
          You have been invited to join {invitation.workspace.name} as{" "}
          {invitation.role}.
        </p>

        <form action={acceptWithToken} className="mt-6">
          <Button type="submit" className="w-full">
            Accept invitation
          </Button>
        </form>
      </div>
    </main>
  );
}