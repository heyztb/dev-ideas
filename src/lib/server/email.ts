import { cache } from "./cache"
import { createHmac } from 'node:crypto'
import type { Account } from "$lib/models/account"
import { HMAC_SECRET, SMTP_SERVER, SENDING_ADDRESS, SENDING_ADDRESS_PASSWORD } from "$env/static/private"
import nodemailer from 'nodemailer'
import { getSiteUrl } from "$lib/siteurl"

const transport = nodemailer.createTransport({
	host: SMTP_SERVER,
	port: 465,
	secure: true,
	auth: {
		user: SENDING_ADDRESS,
		pass: SENDING_ADDRESS_PASSWORD,
	}
})

export const sendVerificationEmail = async (account: Account) => {
	if (cache.has(`email_verification_backoff_${account.username}`)) {
		return { error: 'You must wait before sending another verification email' }
	}

	let verification_token: string
	if (cache.has(`email_verification_${account.email}`)) {
		verification_token = cache.get(`email_verification_${account.email}`) as string
	} else {
		verification_token = createHmac('sha256', HMAC_SECRET)
			.update(`${account.created_at}_${account.email}_${Date.now()}`)
			.digest('hex')

		// token will live for 12 hours or until a user consumes the token
		cache.set(`email_verification_${account.email}`, verification_token, 43200)
	}

	let attempts: number
	if (cache.has(`email_verification_attempts_${account.username}`)) {
		attempts = cache.get(`email_verification_attempts_${account.username}`) as number
		attempts++
		cache.set(`email_verification_attempts_${account.username}`, attempts)
	} else {
		attempts = 1
		cache.set(`email_verification_attempts_${account.username}`, attempts, 180)
	}

	if (attempts >= 3) {
		cache.set(`email_verification_backoff_${account.username}`, true, 600)
	}

	const escaped_email = encodeURIComponent(account.email)
	const link = getSiteUrl(`verifyemail?email=${escaped_email}&token=${verification_token}`)

	try {
		await transport.sendMail({
			from: `rAuto <${SENDING_ADDRESS}>`,
			to: account.email,
			subject: 'Verify your email',
			text: `Hey, thanks for signing up for rAuto! The link to verify your email is below.\nLink: ${link}\nThis link is only valid for 12 hours. If you're trying to verify your email past this 12 hours, you will need to request another verification email from your account settings.\nThanks again!`,
			html: `<h1>Thanks for signing up for rAuto</h1><br /><a href=${link}>Click here to verify your email</a>`
		})
	} catch (e) {
		return { error: 'Something went wrong when sending the verification email, please try again' }
	}

	return { error: null }
}
