import { db } from "$lib/server/db";
import { cache } from "$lib/server/cache";
import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent, cookies }) => {
	const { authed, account } = await parent()
	if (!authed) {
		throw redirect(303, '/login')
	}

	if (account && account.onboard) {
		throw redirect(303, '/dashboard')
	}

	if (account) {
		const database = await db()
		await database.run('UPDATE accounts SET onboard = ? WHERE username = ?', true, account?.username)

		account.onboard = true
		const refresh_token = cookies.get('refresh_token')
		cache.set(`account_${refresh_token}`, account)
	}
}

