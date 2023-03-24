import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
	const { authed, account } = await parent()
	if (!authed) {
		throw redirect(303, '/login')
	}

	if (account && !account.onboard) {
		throw redirect(303, '/subscribe')
	}
}