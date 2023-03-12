// See https://kit.svelte.dev/docs/types#app

import type { Account } from "$lib/models/account";
import NodeCache from "node-cache";
import type Snoowrap from "snoowrap";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			title: string
			description: string
			authed: boolean
			account: Account
		}
		// interface Platform {}
	}
}

export { };
