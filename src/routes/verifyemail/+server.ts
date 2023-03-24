import { redirect, type RequestHandler } from "@sveltejs/kit";
import { cache } from "$lib/server/cache";
import { getUserByEmail, db } from "$lib/server/db";
import type { Account } from "$lib/models/account";

export const GET: RequestHandler = async ({ cookies, url, fetch }) => {
  const access_token = cookies.get('access_token')
  const refresh_token = cookies.get('refresh_token')

  if (!access_token || !refresh_token) {
    throw redirect(303, '/login')
  }

  const query = url.searchParams

  if (!query.has('email') || !query.has('token')) {
    throw redirect(303, '/')
  }

  const query_email = query.get('email') as string
  const query_token = query.get('token') as string

  if (!cache.has(`email_verification_${query_email}`)) {
    throw redirect(303, '/')
  }

  const cache_token = cache.get(`email_verification_${query_email}`) as string
  if (query_token !== cache_token) {
    throw redirect(303, '/')
  }

  const account = await getUserByEmail(query_email)
  if (!account) {
    throw redirect(303, '/')
  }

  account.email_verified = true

  const database = await db()
  await database.run('UPDATE accounts SET email_verified = ? WHERE id = ?', account.email_verified, account.id)

  cache.set(`account_${refresh_token}`, account)
  cache.del(`email_verification_${query_email}`)
  cache.del(`email_verification_backoff_${account.username}`)
  cache.del(`email_verification_attempts_${account.username}`)

  throw redirect(303, '/account')
};
