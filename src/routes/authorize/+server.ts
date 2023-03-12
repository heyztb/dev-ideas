import { getBasicAuthString } from "$lib/reddit";
import { getSiteUrl } from "$lib/siteurl";
import { redirect, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ cookies, url, fetch }) => {
  const query = url.searchParams

  if (query.has('error')) {
    throw redirect(303, '/')
  }

  if (!cookies.get('state')) {
    throw redirect(303, '/')
  }

  if (cookies.get('state') !== query.get('state')) {
    throw redirect(303, '/')
  }

  cookies.delete('state', {
    path: '/'
  })

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: query.get('code') as string,
    redirect_uri: getSiteUrl('authorize')
  }).toString()

  const r = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      'Authorization': getBasicAuthString(),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body 
  })

  const response = await r.json()

  const access_token = response['access_token']
  const refresh_token = response['refresh_token']

  cookies.set('access_token', access_token, {
    path: '/',
  })

  cookies.set('refresh_token', refresh_token, {
    path: '/',
  })

  throw redirect(303, '/dashboard')
};
