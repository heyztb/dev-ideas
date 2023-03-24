import sqlite3 from "sqlite3";
import { open } from "sqlite";
import type { Account } from "$lib/models/account";

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

export const getUserByUsername = async (username: string) => {
	const database = await db()
	return database.get<Account>('SELECT * FROM accounts WHERE username = ?', username)
}

export const getUserByEmail = async(email: string) => {
	const database = await db()
	return database.get<Account>('SELECT * FROM accounts WHERE email = ?', email)
}

export const insertUser = async (account: Account) => {
	const database = await db()
	await database.run('INSERT INTO accounts(username, email, image, plan, status, onboard, email_verified) VALUES (?,?,?,?,?,?,?)', account.username, account.email, account.image, account.plan, account.status, account.onboard, account.email_verified)
}
