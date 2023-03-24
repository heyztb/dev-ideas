import { json, type RequestHandler } from "@sveltejs/kit";
import { stripe } from "$lib/server/stripe";
import { STRIPE_WEBHOOK_SECRET } from "$env/static/private";
import type Stripe from "stripe";
import { db, getUserByEmail } from "$lib/server/db";

export const POST: RequestHandler = async ({ request }) => {
  const database = await db()
  const signature = request.headers.get('stripe-signature') as string
  const body = Buffer.from(await request.text())

  let eventType: string
  let eventData: any

  try {
    const event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET)
    eventData = event.data.object
    eventType = event.type
  } catch (error) {
    return json({ error }, {
      status: 500
    })
  }

  switch (eventType) {
    case 'customer.subscription.created':
      {
        const data = eventData as Stripe.Subscription
        const customer = await stripe.customers.retrieve(data.customer as string) as Stripe.Customer
        const email = customer.email as string

        const account = await getUserByEmail(email)
        if (!account) {
          return json({ error: 'user not found' }, {
            status: 500
          })
        }

        account.plan = 'premium'
        account.status = data.status

        try {
          await database.run('UPDATE accounts SET plan = ?, status = ? WHERE id = ?', account.plan, account.status, account.id)
        } catch (error) {
          console.error(error)
          return json({ error }, {
            status: 500
          })
        }
      }
    case 'customer.subscription.updated':
      {
        const data = eventData as Stripe.Subscription
        const customer = await stripe.customers.retrieve(data.customer as string) as Stripe.Customer
        const email = customer.email as string

        const account = await getUserByEmail(email)
        if (!account) {
          return json({ error: 'user not found' }, {
            status: 500
          })
        }

        account.status = data.status

        try {
          await database.run('UPDATE accounts SET status = ? WHERE id = ?', account.status, account.id)
        } catch (error) {
          console.error(error)
          return json({ error }, {
            status: 500
          })
        }
      }
    case 'customer.subscription.deleted':
      {
        const data = eventData as Stripe.Subscription
        const customer = await stripe.customers.retrieve(data.customer as string) as Stripe.Customer
        const email = customer.email as string

        const account = await getUserByEmail(email) 
        if (!account) {
          return json({ error: 'user not found' }, {
            status: 500
          })
        }
        
        account.plan = 'free'
        account.status = 'active'

        try {
          await database.run('UPDATE accounts SET plan = ?, status = ? WHERE id = ?', account.plan, account.status, account.id)
        } catch (error) {
          console.error(error)
          return json({ error }, {
            status: 500
          })
        }
      }
    default:
      console.error('unsupported stripe webhook received', eventType)
      return json({ error: 'unsupported webhook' }, {
        status: 500
      })
  }
};
