import { resend } from "@/lib/email/resend";
import { invitationEmailHtml } from "@/features/invitations/emails/invitation-email";

type SendInvitationEmailInput = {
  to: string;
  workspaceName: string;
  inviteUrl: string;
  role: string;
};

export async function sendInvitationEmail({
  to,
  workspaceName,
  inviteUrl,
  role,
}: SendInvitationEmailInput) {
  const { data, error } = await resend.emails.send({
    from:
      process.env.RESEND_FROM_EMAIL ??
      "AI Client Portal <onboarding@resend.dev>",
    to: [to],
    subject: `Invitation to join ${workspaceName}`,
    html: invitationEmailHtml({
      workspaceName,
      inviteUrl,
      role,
    }),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}