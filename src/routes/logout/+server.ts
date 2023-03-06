import { redirect, type RequestHandler } from "@sveltejs/kit";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";

export const GET: RequestHandler = async (event) => {
  const { supabaseClient, session } = await getSupabase(event);
  if (!session) {
    throw redirect(303, '/login')
  }

  await supabaseClient.auth.signOut()
  throw redirect(303, '/')
};
