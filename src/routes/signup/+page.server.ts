import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { fail } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit"

export const actions: Actions = {
  signup: async (event) => {
    const { supabaseClient } = await getSupabase(event)

    const { request } = event
    const formData = await request.formData();

    const email = formData.get('email') as string
    if (!email) {
      return fail(400, { error: 'missing email' })
    }

    const password = formData.get('password') as string
    if (!(password.length >= 8)) {
      return fail(400, { error: 'password must be at least 8 characters long' })
    }

    const confirmPassword = formData.get('confirm-password') as string
    if (password !== confirmPassword) {
      return fail(400, { error: 'passwords do not match' })
    }

    const plan = formData.get('plan') as string

    const captchaToken = formData.get('h-captcha-response') as string

    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        captchaToken,
        data: {
          plan,
        },
        emailRedirectTo: 'http://testing.localhost:5173/login'
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