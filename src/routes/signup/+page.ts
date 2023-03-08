import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) => {
  const { session } = await getSupabase(event)
  if (session) {
    throw redirect(303, '/dashboard')
  }

  return {
    title: "rAuto • Signup",
    description: "Signup for rAuto today! The ultimate tool for effortlessly sharing your posts across multiple subreddits simultaneously."
  }
}