"use server";

import { headers } from "next/headers";
import { authRateLimit } from "@/lib/security/rate-limit";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signInSchema, signUpSchema } from "@/features/auth/schemas";
import { bootstrapUserWorkspace } from "@/features/auth/bootstrap";

async function getIpAddress() {
  const headersList = await headers();

  return (
    headersList.get("x-forwarded-for")?.split(",")[0] ??
    headersList.get("x-real-ip") ??
    "unknown"
  );
}
export async function signInAction(formData: FormData) {
  const ip = await getIpAddress();
  
  const { success } = await authRateLimit.limit(`auth:${ip}`);
  
  if (!success) {
    redirect("/login?error=Too many requests");
  }
  
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    redirect("/login?error=Invalid form data");
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    redirect("/login?error=Invalid credentials");
  }

  redirect("/dashboard");
}

export async function signUpAction(formData: FormData) {
  const ip = await getIpAddress();
  
  const { success } = await authRateLimit.limit(`auth:${ip}`);
  
  if (!success) {
    redirect("/login?error=Too many requests");
  }
  
  const parsed = signUpSchema.safeParse({
    workspaceName: formData.get("workspaceName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    redirect("/register?error=Invalid form data");
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error || !data.user) {
    redirect("/register?error=Could not create account");
  }

  await bootstrapUserWorkspace({
    userId: data.user.id,
    email: parsed.data.email,
    workspaceName: parsed.data.workspaceName,
  });

  redirect("/dashboard");
}

export async function signOutAction() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/login");
}