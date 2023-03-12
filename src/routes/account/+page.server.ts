import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { db } from "$lib/server/db";
import { cache } from "$lib/server/cache";
import type { Account } from "$lib/models/account";

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

		const database = await db()
		await database.run('UPDATE accounts SET email = ? WHERE id = ?', email, account.id)

		account.email = email
		cache.set(`account_${refresh_token}`, account)

		return { message: 'Updated successfully', error: '' }
	}
}