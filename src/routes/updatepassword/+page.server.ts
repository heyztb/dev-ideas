import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit"

export const actions: Actions = {
  updatepassword: async (event) => {
    const { supabaseClient } = await getSupabase(event)

    const { request } = event
    const formData = await request.formData();

    const password = formData.get('password') as string
    if (!(password.length >= 8)) {
      return fail(400, { error: 'password must be at least 8 characters long' })
    }

    const confirmPassword = formData.get('confirm-password') as string
    if (password !== confirmPassword) {
      return fail(400, { error: 'passwords do not match' })
    }

    let { error } = await supabaseClient.auth.updateUser({
      password,
    })

    if (error) {
      return fail(500, { error: error.message })
    }

    // log the user back out after resetting their password
    // so that they may use it to login and verify that they once again know their password
    await supabaseClient.auth.signOut()

    throw redirect(303, '/login')
  }
}