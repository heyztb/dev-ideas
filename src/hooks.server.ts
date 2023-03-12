import { sync } from "$lib/server/db";

(async () => {
	await sync()
})()