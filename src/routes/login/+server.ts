import { redirect, type RequestHandler } from "@sveltejs/kit";
import { getRedditAuthUrl } from "$lib/reddit";

export const GET: RequestHandler = async ({ cookies }) => {
  if (cookies.get('access_token') && cookies.get('refresh_token')) {
    throw redirect(303, '/dashboard')
  }

  const { auth_url, state } = getRedditAuthUrl()

  cookies.set('state', state, {
    path: '/',
  })

  throw redirect(303, auth_url)
};
