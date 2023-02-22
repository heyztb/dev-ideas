import { error as err, json } from "@sveltejs/kit"
import type { RequestHandler } from "@sveltejs/kit"
import { getSupabase } from "@supabase/auth-helpers-sveltekit"

export const POST: RequestHandler = async (event) => {
  const { supabaseClient } = await getSupabase(event)

  const { request } = event

  if (request.headers.get("content-type") !== "application/x-www-form-urlencoded") {
    throw err(400, "invalid request: incorrect content-type")
  }

  if (!request.body) {
    throw err(400, "invalid request: empty request body")
  }

  const values = await request.formData()

  if (!values.has("email")) {
    throw err(400, "invalid request: must have email")
  }

  if (!values.has("password")) {
    throw err(400, "invalid request: must have password")
  }

  const email: string = values.get("email")?.toString() ?? ''
  const password: string = values.get("password")?.toString() ?? ''

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password
  })

  if (error) {
    throw err(500, 'failed to create user')
  }

  return json({
    status: 200,
    data: {
      success: true,
      user: data.user?.id,
      token: data.session?.access_token
    }
  })
}