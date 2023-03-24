import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { db, getUserByEmail } from "$lib/server/db";
import { cache } from "$lib/server/cache";
import type { Account } from "$lib/models/account";
import { sendVerificationEmail } from "$lib/server/email";

export const load: PageServerLoad = async ({ parent }) => {
	const { authed } = await parent()
	if (!authed) {
		throw redirect(303, '/login')
	}
}

export const actions: Actions = {
	updateemail: async ({ request, cookies }) => {
		const refresh_token = cookies.get('refresh_token')
		const account = cache.get(`account_${refresh_token}`) as Account
		if (!account) {
			return fail(400, { error: 'Something happened while trying to update your account, please try again.'})
		}

		const formData = await request.formData()
		const email = formData.get('email') as string

		let new_email: boolean = true
		if (email === account.email) {
			new_email = false
		}

		if (new_email) {
			account.email = email
			account.email_verified = false

			const database = await db()
			try {
				await database.run('UPDATE accounts SET email = ?, email_verified = ? WHERE id = ?', account.email, account.email_verified, account.id)
			} catch (error) {
				console.error(error)
				return fail(400, { error })
			}

			cache.set(`account_${refresh_token}`, account)
		}

		const { error } = await sendVerificationEmail(account)
		if (error) {
			return { error }
		}

		return { message: 'Email verification sent, please check your inbox', error: '' }
	}
}