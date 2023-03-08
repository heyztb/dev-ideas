import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit"

export const actions: Actions = {
  createprofile: async (event) => {
    const { supabaseClient, session } = await getSupabase(event)

    const { request } = event
    const formData = await request.formData();

    const user_id = session?.user.id as string
    const plan = session?.user.user_metadata['plan'] as string

    const name = formData.get('name') as string

    supabaseClient.from('profiles').insert({
      user_id,
      name,
      plan,
    })

    throw redirect(303, '/dashboard')
  }
}