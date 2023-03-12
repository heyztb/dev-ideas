import { getBasicAuthString } from "$lib/reddit";
import { redirect, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({cookies, fetch}) => {
  if (!cookies.get('access_token') && !cookies.get('refresh_token')) {
    throw redirect(303, '/login')
  }

  const body = new URLSearchParams({
    token: cookies.get('refresh_token') as string,
    token_type_hint: 'refresh_token'
  }).toString()

  await fetch('https://www.reddit.com/api/v1/revoke_token', {
    method: 'POST',
    headers: {
      'Authorization': getBasicAuthString(),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  })

  cookies.delete('access_token', {
    path: '/'
  })

  cookies.delete('refresh_token', {
    path: '/'
  })

  throw redirect(303, '/')
};
