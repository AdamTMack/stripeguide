/**
 * Serverless function to create a Stripe Checkout Session.
 *
 * Deploy to Vercel, Netlify, or any serverless platform.
 * Requires STRIPE_SECRET_KEY environment variable.
 *
 * Example usage with Vercel:
 *   POST /api/create-checkout-session
 *   Body: { mode: "hosted" | "embedded", priceId?: string }
 */

// This file is a template — it won't run in the Vite dev server.
// Deploy it as a serverless function on your platform of choice.

/*
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: Request) {
  const { mode = 'hosted' } = await req.json();

  const baseParams: Stripe.Checkout.SessionCreateParams = {
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: 'Stripe Guide Test Payment' },
        unit_amount: 2000, // $20.00
      },
      quantity: 1,
    }],
  };

  if (mode === 'hosted') {
    const session = await stripe.checkout.sessions.create({
      ...baseParams,
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/cancel`,
    });
    return Response.json({ url: session.url });
  }

  if (mode === 'embedded') {
    const session = await stripe.checkout.sessions.create({
      ...baseParams,
      ui_mode: 'embedded',
      return_url: `${req.headers.get('origin')}/return?session_id={CHECKOUT_SESSION_ID}`,
    });
    return Response.json({ clientSecret: session.client_secret });
  }

  // Payment Intent mode (for Payment Element)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000,
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
  });
  return Response.json({ clientSecret: paymentIntent.client_secret });
}
*/

export {}
