"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// Define types (you can adjust fields based on your DB)
type Companion = {
  id: string;
  name: string;
  subject: string;
  topic: string;
  author: string;
  // add other fields from your `companions` table as needed
};

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .insert({ ...formData, author })
    .select();

  if (error || !data)
    throw new Error(error?.message || "Failed to create a companion");

  return data[0];
};

export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  const supabase = createSupabaseClient();

  let query = supabase.from("companions").select();

  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;

  if (error) throw new Error(error.message);

  return companions;
};

export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id);

  if (error) return console.log(error);

  return data[0];
};

export const addToSessionHistory = async (companionId: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("session_history").insert({
    companion_id: companionId,
    user_id: userId,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const getRecentSessions = async (limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ companions }) => companions);
};

export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ companions }) => companions);
};

export const getUserCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("author", userId);

  if (error) throw new Error(error.message);

  return data;
};

export const newCompanionPermissions = async () => {
  const { userId, has } = await auth();
  const supabase = createSupabaseClient();

  let limit = 0;

  if (has({ plan: "pro" })) {
    return true;
  } else if (has({ feature: "3_companion_limit" })) {
    limit = 3;
  } else if (has({ feature: "10_companion_limit" })) {
    limit = 10;
  }

  const { data, error } = await supabase
    .from("companions")
    .select("id", { count: "exact" })
    .eq("author", userId);

  if (error) throw new Error(error.message);

  const companionCount = data?.length;

  return companionCount < limit;
};

export const deleteCompanion = async (companionId: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  // First, verify the companion exists and belongs to the user
  const { data: companion, error: fetchError } = await supabase
    .from("companions")
    .select("id, author")
    .eq("id", companionId)
    .single();

  if (fetchError || !companion) {
    throw new Error("Companion not found");
  }

  if (companion.author !== userId) {
    throw new Error("You can only delete your own companions");
  }

  // Delete the companion
  const { error: deleteError } = await supabase
    .from("companions")
    .delete()
    .eq("id", companionId)
    .eq("author", userId);

  if (deleteError) {
    throw new Error(deleteError.message || "Failed to delete companion");
  }

  // Revalidate the companions page to refresh the list
  revalidatePath("/companions");
  revalidatePath("/my-journey");

  return { success: true };
};
