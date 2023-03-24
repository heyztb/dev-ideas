import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ( { data }) => {
	return {
		authed: data.authed,
		account: data.account,
	}
}