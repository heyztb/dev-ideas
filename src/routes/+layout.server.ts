import { REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET } from "$env/static/private";
import type { Account } from "$lib/models/account";
import { userAgent } from "$lib/reddit";
import { getUserByUsername, insertUser } from "$lib/server/db";
import { cache } from "$lib/server/cache";
import Snoowrap from "snoowrap";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies }) => {
	const access_token = cookies.get('access_token')
	const refresh_token = cookies.get('refresh_token')

	if (access_token && refresh_token) {
		if (cache.has(`account_${refresh_token}`)) {
			const account = cache.get(`account_${refresh_token}`) as Account
			return { authed: true, account }
		}

		const r = new Snoowrap({
			userAgent,
			clientId: REDDIT_CLIENT_ID,
			clientSecret: REDDIT_CLIENT_SECRET,
			refreshToken: refresh_token
		})

		const userPromise = r.getMe().then(async (redditUser) => {
			try {
				let account = await getUserByUsername(redditUser.name)
				if (!account) {
					await insertUser({
						username: redditUser.name,
						email: '',
						image: redditUser.icon_img,
						plan: 'free',
						status: 'active',
						onboard: false,
						email_verified: false
					})
					account = await getUserByUsername(redditUser.name) as Account
				}
				cache.set(`account_${refresh_token}`, account)
				return { account }
			} catch (e) {
				console.error(e)
				return { account: null }
			}
		})

		const { account } = await userPromise

		return { authed: true, account }
	}
	
	return { authed: false, account: null }
}