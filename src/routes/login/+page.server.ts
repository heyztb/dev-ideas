import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit"

export const actions: Actions = {
  login: async (event) => {
    const { supabaseClient } = await getSupabase(event)

    const { request } = event
    const formData = await request.formData();

    const email = formData.get('email')?.toString() ?? ''
    const password = formData.get('password')?.toString() ?? ''
    const captchaToken = formData.get('h-captcha-response')?.toString() ?? ''

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
      options: {
        captchaToken,
      }
    })

    if (error) {
      return fail(500, { error: error.message })
    }

    throw redirect(303, '/dashboard')
  }
}