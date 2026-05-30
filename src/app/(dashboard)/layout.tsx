
import { CommandPalette } from "@/components/search/command-palette";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentWorkspace } from "@/lib/auth/current-workspace";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardTopbar } from "@/components/layout/dashboard-topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/login");
  }

  const { workspace, role } = await getCurrentWorkspace();

  return (
    <div className="flex min-h-screen bg-background">
      <CommandPalette />
      
      <DashboardSidebar workspaceName={workspace.name} role={role} />

      <div className="flex min-h-screen flex-1 flex-col">
        <DashboardTopbar
          email={user.email}
          role={role}
          workspaceName={workspace.name}
        />

        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}