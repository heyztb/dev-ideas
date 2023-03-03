import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) => {
  const { session } = await getSupabase(event)
  if (!session) {
    throw redirect(303, '/login')
  }

  return {
    title: "rAuto • Dashboard",
    description: "rAuto Dashboard - Effortlessly share your posts across multiple subreddits simultaneously."
  }
}