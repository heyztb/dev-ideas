import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { fail } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit"

export const actions: Actions = {
  signup: async (event) => {
    const { supabaseClient } = await getSupabase(event)

    const { request } = event
    const formData = await request.formData();

    const email = formData.get('email')?.toString() ?? ''
    const password = formData.get('password')?.toString() ?? ''
    if (!(password.length >= 8)) {
      return fail(400, { error: 'password must be at least 8 characters long' })
    }
    const captchaToken = formData.get('h-captcha-response')?.toString() ?? ''

    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        captchaToken
      }
    })

    if (error) {
      return fail(500, { error: error.message })
    }

    return {
      success: true,
      message: "Awesome, we've sent you a verification email. Check your email to continue."
    }
  }
}