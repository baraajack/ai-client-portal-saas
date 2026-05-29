type InvitationEmailInput = {
  workspaceName: string;
  inviteUrl: string;
  role: string;
};

export function invitationEmailHtml({
  workspaceName,
  inviteUrl,
  role,
}: InvitationEmailInput) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
      <h1 style="font-size: 24px; margin-bottom: 16px;">
        You have been invited
      </h1>

      <p style="font-size: 16px; color: #444;">
        You have been invited to join <strong>${workspaceName}</strong>
        as <strong>${role}</strong>.
      </p>

      <a
        href="${inviteUrl}"
        style="
          display: inline-block;
          margin-top: 24px;
          padding: 12px 18px;
          background: #111827;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
        "
      >
        Accept invitation
      </a>

      <p style="margin-top: 24px; font-size: 13px; color: #666;">
        This invitation expires in 7 days.
      </p>
    </div>
  `;
}