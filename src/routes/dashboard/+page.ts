import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) => {
  const { supabaseClient, session } = await getSupabase(event)
  if (!session) {
    throw redirect(303, '/login')
  }

  // check to make sure user has completed onboarding flow
  const { data } = await supabaseClient.from('profiles').select('*')
  if (!data || data.length === 0) {
    throw redirect(303, '/welcome')
  }

  return {
    title: "rAuto • Dashboard",
    description: "rAuto Dashboard - Effortlessly share your posts across multiple subreddits simultaneously."
  }
}