import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { fail } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit"

export const actions: Actions = {
  reset: async (event) => {
    const { supabaseClient } = await getSupabase(event)

    const { request } = event
    const formData = await request.formData();

    const email = formData.get('email') as string
    if (!email) {
      return fail(400, { error: 'missing email' })
    }

    const captchaToken = formData.get('h-captcha-response') as string

    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      captchaToken,
      redirectTo: 'http://testing.localhost:5173/updatepassword'
    })

    if (error) {
      return fail(500, { error: error.message })
    }

    return {
      success: true,
      message: "We sent you a password reset email. Check your email to continue."
    }
  }
}