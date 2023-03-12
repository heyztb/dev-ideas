 import sqlite3 from "sqlite3";
 import { open } from "sqlite";

export const db = async () => {
	sqlite3.verbose()
	return open({
		driver: sqlite3.cached.Database,
		filename: 'rauto.db'
	})
}

export const sync = async () => {
	try {
		const database = await db()
		await database.migrate({
			force: true
		})
	} catch (e) {
		console.log(e)
	}
}
