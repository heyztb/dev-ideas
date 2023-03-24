import { npm_package_version, REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET } from "$env/static/private"
import { getSiteUrl } from "./siteurl"

const redirect_uri = getSiteUrl('authorize')

export const userAgent = `web:rAuto:${npm_package_version} (by /u/0x7a7462)`

export const getRedditAuthUrl = () => {
	const state = Math.random().toString(16).substring(2, 12)

	const auth_url = `https://www.reddit.com/api/v1/authorize?client_id=${REDDIT_CLIENT_ID}&response_type=code&state=${state}&redirect_uri=${redirect_uri}&duration=permanent&scope=read,identity,submit`
	return {
		auth_url,
		state
	}
}

export const getBasicAuthString = () => {
	const cred = Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`).toString('base64')
	return `Basic ${cred}`
}