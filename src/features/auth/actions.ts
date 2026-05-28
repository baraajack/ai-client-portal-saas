"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/login?error=Invalid credentials");
  }

  redirect("/dashboard");
}

export async function signUpAction(formData: FormData) {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    redirect("/register?error=Could not create account");
  }

  redirect("/login?message=Check your email to confirm your account");
}

export async function signOutAction() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/login");
}