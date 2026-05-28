import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db/prisma";

export const getCurrentUser = cache(async () => {
  const supabase = await createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: authUser.id,
    },
  });

  if (!user) {
    redirect("/login");
  }

  return user;
});