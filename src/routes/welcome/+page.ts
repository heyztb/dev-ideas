import type { PageLoad } from "./$types";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { redirect } from "@sveltejs/kit";

export const load: PageLoad = async (event) => {
  const { session } = await getSupabase(event)
  if (!session) {
    throw redirect(303, '/login')
  }

  return {
    title: "Welcome to rAuto",
    description: "Welcome to rAuto - A quick thank you for signing up and onboarding information"
  }
}